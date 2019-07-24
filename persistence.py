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

