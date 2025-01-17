from fastapi import APIRouter, status, HTTPException, Depends
from config.db import conn
from schemas.user import User
from datetime import datetime, date
from models.dbschema import dbPlanner
from config.oauth2 import get_current_user

import json
import random
import datetime
import numpy as np
import pandas as pd
from tabulate import tabulate

from sqlalchemy.orm import Session
from config.db import get_db
#from config.redisdb import redis_client



from config.profiler import profiler
from config.redisdb import redis_db
my_redis = redis_db()

my_profiler = profiler()



ranking = APIRouter(
    prefix = "/ranking",
    tags=["ranking"]
)


def notification_match(num1, num2):
    try:
        float(num1)
        float(num2)
    except ValueError:
        return False
    return float(num1) == float(num2)
   
   
# Returns list of pairs of [Expected date (MD04), Erdat (Zgrve)]
# Change to [Expected date, Good reciept date] in future
def data(part_number, planner_id):
    data = []
    md04 = []
    zgrve = []
    part_number2 = str(part_number)[0:7]+'-'+str(part_number)[7:9]

    # makes a 2-D array with all the md04 data
    #file1 = pd.read_csv('/Users/pankeshpatel/Desktop/colab-data/MD04.csv')
    
    # Accessing data from MD04
    sql_md04 = """SELECT material, demand_date, shipping_notification, mrp_element  FROM MD04 WHERE material = %s AND planner = %s"""
    file1 = pd.DataFrame(conn.execute(sql_md04, part_number2, planner_id).fetchall())
    
    if len(file1.columns) == 0:
         print("*******MD04************************************")
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Data item does not exist")

    
    # Accessing data from Zgrev
    
    sql_zgrve = """SELECT matnr, erdat, vbeln from Zgrve WHERE matnr = %s"""
    file2 = pd.DataFrame(conn.execute(sql_zgrve, part_number).fetchall())
    
    if len(file2.columns) == 0:
         print("*******Zgrve************************************")
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Data item does not exist")
    
    
    #file2 = pd.read_csv('/Users/pankeshpatel/Desktop/colab-data/Zgrve.csv')
    #print(file2)
    
    md04 = pd.DataFrame(file1, columns=['material','demand_date','shipping_notification','mrp_element'])
    zgrve = pd.DataFrame(file2, columns=['matnr','erdat','vbeln'])

    # lists the relevant data
    material = list(md04['material'])
    demand_date = list(md04['demand_date'])
    ship_not = list(md04['shipping_notification'])
    mrp_element = list(md04['mrp_element'])
    

    matnr = list(zgrve['matnr'])
    erdat = list(zgrve['erdat'])
    vbeln = list(zgrve['vbeln'])

   # adds the proper dates into a list
    for i in range(len(material)):
        matches = 0
        if mrp_element[i] == 'ShipNt' and material[i] == part_number2:
            for j in range(len(zgrve)):
                if part_number == str(matnr[j]) and matches == 0 and notification_match(ship_not[i],vbeln[j]):
                    date = demand_date[i].split('/')
                    date = datetime.date(int(date[2]),int(date[0]),int(date[1]))
                    date2 = erdat[j].split('/')
                    date2 = datetime.date(int(date2[2]),int(date2[0]),int(date2[1]))

                    data.append([date,date2])
                    matches += 1
                    
            if matches == 0:
                date = demand_date[i].split('/')
                date = datetime.date(int(date[2]),int(date[0]),int(date[1]))
                num_list = [-3,-2,-1,0,1,2,3]
                random_date = date + datetime.timedelta(days = num_list[random.randint(0,6)])
                data.append([date,random_date])
                matches += 1
    
    return data
   

# Makes the probability matrix into percentages 
# (ex. 1 0 0 3 becomes .25 0 0 .75)
def create_percentages(matrix):
    for row in range(len(matrix)):
        row_total = 0
        for num in matrix[row]:
            row_total += num
        for num in range(len(matrix[row])):
            if row_total != 0:
                matrix[row][num] /= row_total
    return matrix
   
   
# The Markov theory relies on the last arrival time to make a probability
# Creates a 7x7 probability matrix but returns row based on last arrival time
def markov_values(part_number, part_data, planner_id):
    A = []
    for i in range(0,7):
        m = []
        for j in range(0,7):
            x=0.
            m.append(x)
        A.append(m)

    pre_val = -999
    val = -999
    part_data = data(part_number, planner_id)

    for i in range(len(part_data)):
        expected = part_data[i][0]
        actual = part_data[i][1]

        # calculates expected - actual arrival time
        # rounds down to 3 days early or late if it exceeds that
        val = (expected-actual).days
        if val < -3:
            val = -3
        elif val > 3:
            val = 3

        # adds the values into the matrix
        if -365 <= pre_val and pre_val <= 365:
            A[6-(pre_val+3)][6-(val+3)] += 1
        pre_val = (expected-actual).days
        if pre_val < -3:
            pre_val = -3
        elif pre_val > 3:
            pre_val = 3

    return create_percentages(A)[6-(val+3)]
   
   
# Returns the entire probability matrix for the long-run calculations
def probability_matrix(part_number, planner_id):
    A = []
    for i in range(0,7):
        m = []
        for j in range(0,7):
            x=0.
            m.append(x)
        A.append(m)

    pre_val = -999
    val = -999
    part_data = data(part_number, planner_id)


    for i in range(len(part_data)):
        expected = part_data[i][0]
        actual = part_data[i][1]

        # calculates expected - actual arrival time
        # rounds down to 3 days early or late if it exceeds that
        val = (expected-actual).days
        if val < -3:
            val = -3
        elif val > 3:
            val = 3

        # adds the values into the matrix
        if -365 <= pre_val and pre_val <= 365:
            A[6-(pre_val+3)][6-(val+3)] += 1
        pre_val = (expected-actual).days
        if pre_val < -3:
            pre_val = -3
        elif pre_val > 3:
            pre_val = 3

    return create_percentages(A)
   
   
# Returns the Markov output and prints it
# 7 short-run markov probabilites from 3 days early to 3 days late
def markov(part_number, planner_id):
    markov_row = markov_values(part_number, data(part_number, planner_id), planner_id)
    return markov_row
   
   
# Returns the long-run output and prints it
# 3 long-run probabilities: early, on-time, late
def long_run(part_number, planner_id):
    A = probability_matrix(part_number, planner_id)
    for i in range(len(A)):
        for j in range(len(A[0])):
            if i == j:
                A[i][j] -= 1.
            if j == len(A)-1:
                A[i][j] = 1.
    M = np.linalg.inv(A)[len(A)-1]

    long_run = [M[0]+M[1]+M[2],
                M[3],
                M[4]+M[5]+M[6]]
    return long_run
   
   
# The only two outputs:
# 1. Markov probability (standard bar graph)
# 2. Long-run probability (horizontal 100% stacked bar graph)

# async def part_probabilities(planner_id: str, material_id: str, user_id: int = Depends(get_current_user), session: Session = Depends(get_db)):

@ranking.get('/{planner_id}/{material_id}',status_code = status.HTTP_200_OK)
async def part_probabilities(planner_id: str, material_id: str):
    
    part_ranking_key = "ranking" + "/" + planner_id + "/" + material_id
    
    redis_reponse = my_redis.get(part_ranking_key)
    
    
    #redis_reponse = redis_client.get(part_ranking_key)
    
    # Check if the data exists in Cache
    if redis_reponse != None:
        print("Found the results in redis cache.......ranking()")
        return json.loads(redis_reponse)
    else: 
        print("I have not found the results in redis cache, computing now...")   
        #my_profiler.start("part probabilities")        
        markov_probabilities = markov(material_id, planner_id)
        long_run_probabilities = long_run(material_id, planner_id)
        markov_early = markov_probabilities[0]+markov_probabilities[1]+markov_probabilities[2]
        markov_ontime = markov_probabilities[3]
        markov_late = markov_probabilities[4]+markov_probabilities[5]+markov_probabilities[6]
        

        json_output = {
            'material': material_id,
            'markov':[{'-3':markov_probabilities[0]},
                    {'-2':markov_probabilities[1]},
                    {'-1':markov_probabilities[2]},
                    {'0':markov_probabilities[3]},
                    {'1':markov_probabilities[4]},
                    {'2':markov_probabilities[5]},
                    {'3':markov_probabilities[6]}],
	    'markov string': 'There is a {}% chance of being early, {}% chance of being on-time, and {}% chance of being late'.format(round(markov_early*100,2),round(markov_ontime*100,2),round(markov_late*100,2)),

            'long run':[{'early':long_run_probabilities[0]},
                        {'on time':long_run_probabilities[1]},
                        {'late':long_run_probabilities[2]}],
	    'long run string': 'There is a {}% chance of being early, {}% chance of being on-time, and {}% chance of being late'.format(round(long_run_probabilities[0]*100,2),round(long_run_probabilities[1]*100,2),round(long_run_probabilities[2]*100,2))
        }
        
        # my_profiler.end("part probabilities")
        # my_profiler.log("print")

        # Caching the API Response
        #redis_client.set(part_ranking_key, json.dumps(json_output, indent=4) )
        
        my_redis.put(part_ranking_key, json.dumps(json_output, indent=4))
        

        return json.loads(json.dumps(json_output, indent=4))



# The only user input is the part number
# part_number = random.choice([742065710,809198305,743093505,807165907,741788607])
# print(part_probabilities(part_number))



# This is a material 
# @ranking.get('/{material_id}',status_code = status.HTTP_200_OK)
# async def part_ranking(material_id:str):
#    #part_number = random.choice([742065710,809198305,743093505,807165907,741788607])
#    print(part_probabilities(material_id))






