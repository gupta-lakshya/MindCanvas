from flask import Flask, request, jsonify
from connection import create_connection
from flask_cors import CORS
import os
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()
from mysql import connector
from mysql.connector import Error
from connection import create_connection
from schema import create_database, create_table

app = Flask(__name__)
CORS(app)

connection = create_connection(os.getenv("MYSQL_HOST"), os.getenv("MYSQL_USERNAME"), os.getenv("MYSQL_PASSWORD"))
if connection:
    create_database_query = "CREATE DATABASE IF NOT EXISTS mindcanvas"
    create_database(connection, create_database_query)

    create_table_user = """
    CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(255),
        prompt TEXT NOT NULL,
        emotion VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """
    create_table(connection, "mindcanvas", create_table_user)
    # create_table_mood = """
    # CREATE TABLE IF NOT EXISTS moods (
    #     user_id VARCHAR(255) PRIMARY KEY,
    #     user_mood VARCHAR(255) NOT NULL,
    #     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    # )
    # """
    # create_table(connection, "mindcanvas", create_table_mood)
    connection.close()
def _get_connection():
    return create_connection(os.getenv("MYSQL_HOST"), os.getenv("MYSQL_USERNAME"), os.getenv("MYSQL_PASSWORD"))


@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "ok"})


@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    prompt = data.get('prompt')
    emotion = data.get('emotion')
    created_at = datetime.now().isoformat()  # default to now if not provided

    if not user_id or not prompt:
        return jsonify({"error": "user_id and prompt are required"}), 400

    # parse created_at if provided (ISO format), otherwise use now
    if created_at:
        try:
            created_at_dt = datetime.fromisoformat(created_at)
        except Exception:
            created_at_dt = datetime.now()
    else:
        created_at_dt = datetime.now()

    conn = _get_connection()
    if not conn:
        return jsonify({"error": "database connection failed"}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("USE mindcanvas")
        cursor.execute(
            "INSERT INTO users (user_id, prompt, emotion, created_at) VALUES (%s, %s, %s, %s)",
            (user_id, prompt, emotion, created_at_dt),
        )
        conn.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

    return jsonify({"message": "User saved"}), 201



# @app.route('/user_mood', methods=['POST'])
# def create_user_mood():
#     data = request.get_json() or {}
#     user_id = data.get('user_id')
#     mood = data.get('mood')
#     created_at = data.get('created_at')

#     if not user_id or not mood:
#         return jsonify({"error": "user_id and mood are required"}), 400

#     if created_at:
#         try:
#             created_at_dt = datetime.fromisoformat(created_at)
#         except Exception:
#             created_at_dt = datetime.now()
#     else:
#         created_at_dt = datetime.now()

#     conn = _get_connection()
#     if not conn:
#         return jsonify({"error": "database connection failed"}), 500

#     try:
#         cursor = conn.cursor()
#         cursor.execute("USE mindcanvas")
#         cursor.execute(
#             "INSERT INTO moods (user_id, user_mood, created_at) VALUES (%s, %s, %s)",
#             (user_id, mood, created_at_dt),
#         )
#         conn.commit()
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         conn.close()

#     return jsonify({"message": "Mood saved"}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))