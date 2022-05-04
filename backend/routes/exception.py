from fastapi import APIRouter, status
from models.dbschema import  dbExceptionMessage, dbExceptionManager
from config.db import conn
from datetime import datetime, date
import pandas as pd
import janitor
from tabulate import tabulate
import json



exception = APIRouter()
exceptionlist = []
materiallist = []

# Write a logic that returns a list of  exception ID  and exception message

# API call
# http://localhost:8000/exceptions/
@exception.get('/exceptions/', tags=["Exception Manager"], status_code = status.HTTP_200_OK)
async def get_all_exception_info():
    
    return conn.execute(dbExceptionMessage.select()).fetchall()


# This list an exception with an id and an exception message

# API Call
# http://localhost:8000/exception-manager/114/?start_date=02/18/22&end_date=04/04/22

# We write "status_code" to change a default behabiour of FastAPI.
# by default, FastAPI returns "200_OK", when everything is okay. This may be good got GET operation.
# however, it may not be good for POST operation to create a certain thing, for the POST - create, one need to
# send "201_Created" , instead of 200_HTTP_OK. 
# status_code = status.HTTP_201_CREATE would change a default behaviour.

@exception.get('/exception-manager/{planner_id}', tags=["Exception Manager"], status_code = status.HTTP_200_OK)
async def exception_manager(planner_id:str, 
                                      start_date : str,
                                      end_date : str):
    
    sql = """SELECT * FROM admin.Exception"""
    df_exception_manager = pd.DataFrame(conn.execute(sql).fetchall())
    
    
      # 1 - matnr, 3 - cdate , 9 - auskt
    dataframe_exception_manager = pd.concat([df_exception_manager[1], df_exception_manager[3], df_exception_manager[9]], axis=1, keys=['matnr', 'cdate', 'auskt' ])
    
    #  Data cleaning, replacing NaN with '0'
    dataframe_exception_manager['auskt'] = dataframe_exception_manager['auskt'].fillna(0)
    
    # Data filtering with respect to the start and end date
    dataframe_exception_manager_filtered = dataframe_exception_manager.filter_date('cdate', start_date, end_date)


    # Remove row that 'auskt' value has zero
    dataframe_exception_manager_filter = dataframe_exception_manager_filtered[dataframe_exception_manager_filtered['auskt'] > 0]

    # This would display all rows of a panda dataframe
    pd.set_option('display.max_rows', dataframe_exception_manager_filter.shape[0]+1)
    
    exception_manager_count = dataframe_exception_manager_filter.groupby('auskt').count()
    
    # count
    exception_manager_count.rename(columns = {'matnr':'count'}, inplace = True)
    exception_manager_count.drop('cdate', axis =1, inplace = True)
    
    # 'percentage'
    exception_manager_percentage = ((exception_manager_count['count'] / len(dataframe_exception_manager_filter))*100).to_frame()
    exception_manager_percentage.rename(columns = {'count':'percentage'}, inplace = True)

    # combine "count" and "percentage" column into one Table
    exception_manager_result = pd.concat([exception_manager_count, exception_manager_percentage], axis=1)

    # reset index
    exception_manager_result.reset_index(inplace=True)
    exception_manager = exception_manager_result.rename(columns = {'auskt':'exception'})
        
    
    # To find more details about exceptions
    
    local_exceptionMsg = []
    
    for item in list(exception_manager['exception']):
        sql = """SELECT * FROM admin.ExceptionMessage where exceptionID = %s"""
        exceptionMsg = conn.execute(sql, item).fetchall()
        df_exceptionMsg = pd.DataFrame(exceptionMsg, columns=["exceptionID", "exceptionMsg"])
        local_exceptionMsg = [
           df_exceptionMsg["exceptionID"][0],
            df_exceptionMsg["exceptionMsg"][0]
        ]
        exceptionlist.append(local_exceptionMsg)
        

    df_exceptionlist  = pd.DataFrame(exceptionlist, columns=["exceptionID", "exceptionMsg" ]) 
    

    
    response = {
        "planner" : planner_id,
        "start_date" : start_date,
        "end_date" : end_date,
        "result": json.loads(json.dumps(list(exception_manager.T.to_dict().values()))),
         "exceptions": json.loads(json.dumps(list(df_exceptionlist.T.to_dict().values())))    
    }
    
    return response
    
    



# This API will responsible for exception matrix functionality
# This API will return - a percentage of exceptions in each material in the timeframe of start-date and end-date.

# API Call
# http://localhost:8000/exception-matrix/114/?start_date=02/18/22&end_date=04/04/22

# We write "status_code" to change a default behabiour of FastAPI.
# by default, FastAPI returns "200_OK", when everything is okay. This may be good got GET operation.
# however, it may not be good for POST operation to create a certain thing, for the POST - create, one need to
# send "201_Created" , instead of 200_HTTP_OK. 
# status_code = status.HTTP_201_CREATE would change a default behaviour.

@exception.get('/exception-matrix/{planner_id}/', tags=["Exception Manager"], 
               status_code = status.HTTP_200_OK)
async def exception_matrix(planner_id:str, 
                                      start_date : str,
                                      end_date : str):
    
    
    # Data Reading from MySQL 
    sql = """SELECT * FROM admin.Exception"""
    
    df_exception = pd.DataFrame(conn.execute(sql).fetchall()) 
    
    
    # 1 - matnr, 3 - cdate , 9 - auskt
    dataframe_exception = pd.concat([df_exception[1], df_exception[3], df_exception[9]], axis=1)
    
    #  Data cleaning, replacing NaN with '0'
    dataframe_exception[9] = dataframe_exception[9].fillna(0)
    
    
     # Data filtering with respect to the start and end date
    dataframe_exception_filtered = dataframe_exception.filter_date(3, start_date, end_date)


    # Remove row that 'auskt' value has zero
    data_filter = dataframe_exception_filtered[dataframe_exception_filtered[9] > 0]

    # This would display all rows of a panda dataframe
    pd.set_option('display.max_rows', data_filter.shape[0]+1)
    
    
    # "count" column
    exception_count = data_filter.groupby(1).count()
    exception_count.rename(columns = {9:'count'}, inplace = True)
    exception_count.drop(3, axis =1, inplace = True)
    

    # 'percentage'
    exception_percentage = ((exception_count['count'] / len(data_filter))*100).to_frame()
    exception_percentage.rename(columns = {'count':'percentage'}, inplace = True)
    
    # combine "count" and "percentage" column into one Table
    result = pd.concat([exception_count, exception_percentage], axis=1)

    # reset index
    result.reset_index(inplace=True)
    exception_matrix = result.rename(columns = {1:'material'})
     
    
    # To find more details about the material
    
    local_material = []
    
    for item in list(exception_matrix["material"]):
        
        sql = """SELECT DISTINCT material, material_9, material_7, mat_description, mat_description_eng FROM admin.MaterialMaster where material_9 = %s"""
               
        df_material_master = pd.DataFrame(conn.execute(sql, item).fetchall(), columns=["material", "material_9" , "material_7", "mat_description", "mat_description_eng"])
                    
            
        local_material = [
            df_material_master["material"][0],
            df_material_master["material_9"][0],
            df_material_master["material_7"][0],
            df_material_master["mat_description"][0],
            df_material_master["mat_description_eng"][0],
        ]
        
        materiallist.append(local_material)
            
    df_materiallist = pd.DataFrame(materiallist,columns=["material", "material_9", "material_7", "mat_description", "mat_description_eng"] )
        

    response = {
        "planner" : planner_id,
        "start_date" : start_date,
        "end_date" : end_date,
        "result": json.loads(json.dumps(list(exception_matrix.T.to_dict().values()))) , 
        "materials" : json.loads(json.dumps(list(df_materiallist.T.to_dict().values()))),   
    }
    
    return response

