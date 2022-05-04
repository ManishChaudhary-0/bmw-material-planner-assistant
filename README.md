## backend

### to install dependences

```
pip install -r requirements.txt
```

```
cd backend
uvicorn main:app --reload
```

```
aws ec2
nohup uvicorn main:app --reload --host 0.0.0.0 &
```

mysql docker

```
docker run --name mysqldb --platform linux/x86_64 -e MYSQL_DATABASE=admin -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 mysql:latest
```

API Server

```
http://localhost:8000/docs

```

## database - mysql

```
/usr/local/mysql/bin/mysql -u root -p
show databases;
use admin;
show tables;
```

## frontend

```
cd frontend

```

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

### frontend deployment to EC2

[Guide](https://medium.com/today-i-solved/how-to-deploy-next-js-on-aws-ec2-with-ssl-https-7980ec6fe8d3)

### API guide

- health score query sample:
- http://localhost:8000/healthscore/114/7417886-07?healthdate=04/20/22&plant=MC10

### Database guide

- MD04 data must be sorted according to the demand_date (oldest first)
- demand_date field format must be in mm/dd/yy (e.g., 04/20/22).
- the .csv file is in UTF-CSV format, Save the UTF-CSV file to .csv file
