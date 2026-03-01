from mysql import connector
from mysql.connector import Error
from dotenv import load_dotenv
import os
load_dotenv()

def create_connection(host_name,username,password):
    try:
        connection = connector.connect(
            host=host_name,
            user=username,
            password=password
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None