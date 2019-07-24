import connection


@connection.connection_handler
def get_statuses(cursor):
    cursor.execute("""
        SELECT * FROM statuses;
    """)
    return cursor.fetchall()


@connection.connection_handler
def get_boards(cursor):
    cursor.execute("""
        SELECT * FROM boards;
    """)
    return cursor.fetchall()


@connection.connection_handler
def get_cards(cursor):
    cursor.execute("""
        SELECT * FROM cards;
    """)
    return cursor.fetchall()


@connection.connection_handler
def add_board(cursor):
    cursor.execute("""
                      INSERT INTO boards (title)
                      VALUES (%(title)s);
                       """,
                   {"title": "Board"

                    })

@connection.connection_handler
def add_question(cursor, data):
    cursor.execute("""
                    INSERT INTO question (submission_time, view_number, vote_number, title, message, image, user_id )
                    VALUES (%(submission_time)s, %(view_number)s, %(vote_number)s, %(title)s, %(message)s, %(image)s, %(user_id)s );
                   """,
                   {"submission_time": util.date_now(),
                    "view_number": 0,
                    "vote_number": 0,
                    "title": data["title"],
                    "message": data["message"],
                    "image": data["image"],
                    "user_id": get_user_id_by_username(session["username"])})

