from sqlalchemy import create_engine, MetaData
from config.env import settings


connect_string = f'mysql+pymysql://root:root123@0.0.0.0:3306/admin?charset=utf8mb4'


# DB_USER="root"
# DB_PASSWORD="root123"
# DB_HOST="mysql"
# DB_PORT="3306"
# DATABASE="admin"


# connect_string = 'mysql+pymysql://{}:{}@{}/{}?port={}?charset=utf8'.format(DB_USER, DB_PASSWORD, DB_HOST, DATABASE, DB_PORT)




#connect_string = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format(settings.DB_USER, settings.DB_PASSWORD, settings.DB_HOST, settings.DB_PORT, settings.DATABASE)



#connect_string = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format(settings.DB_USER, settings.DB_PASSWORD, settings.DB_HOST, settings.DB_PORT, settings.DATABASE)


#connect_string = f'mysql+pymysql://{}:{}@{}/{}?port={}?charset=utf8mb4'.format(DB_USER, DB_PASSWORD, DB_HOST, DATABASE, DB_PORT)
#connect_string = f'mysql+pymysql://root:admin@localhost/admin?charset=utf8mb4'
#connect_string = f'mysql+pymysql://root:admin@localhost:3306/admin?charset=utf8'

#connect_string = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DATABASE}?charset=utf8'




engine = create_engine(connect_string)
meta = MetaData()
conn = engine.connect()