import psycopg2
from dotenv import dotenv_values


def connect_db():
    config = dotenv_values(".env")
    database_url = config.get("DATABASE_URL")
    try:
        conn = psycopg2.connect(database_url)
        print("connected to db")
        return conn
    except psycopg2.Error as e:
        print(f"error: {e}")


if __name__ == "__main__":
    connect_db()
