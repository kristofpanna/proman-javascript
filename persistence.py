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
        SELECT * FROM boards
        ORDER BY id;
    """)
    return cursor.fetchall()


@connection.connection_handler
def get_cards(cursor):
    cursor.execute("""
        SELECT * FROM cards;
    """)
    return cursor.fetchall()

@connection.connection_handler
def rename_board(cursor, board_id, new_title):
    cursor.execute("""
     UPDATE boards
                SET title = %(new_title)s
                WHERE id = %(board_id)s;
    """, {'new_title': new_title, 'board_id': board_id})
