import os
from mysql import connector
from mysql.connector import Error

def create_database(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as e:
        print(f"Error creating database: {e}")

def create_table(connection,database_name,query):
    cursor = connection.cursor()
    try:
        cursor.execute(f"USE {database_name}")
        cursor.execute(query)
        print("Table created successfully")
    except Error as e:
        print(f"Error creating table: {e}")
