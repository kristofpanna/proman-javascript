from psycopg2 import sql

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
def add_board(cursor):
    cursor.execute("""
                      INSERT INTO boards (title)
                      VALUES (%(title)s);
                       """,
                   {"title": "Board"

                    })

@connection.connection_handler
def delete_from_table_by_id(cursor, id, input_table):
    cursor.execute(
        sql.SQL("""
                DELETE FROM {table}
                WHERE id = %(id)s;""").format(table=sql.Identifier(input_table)),
                {'id': id})

@connection.connection_handler
def delete_board(cursor, id):
    cursor.execute("""
                DELETE FROM boards
                WHERE id = %(id)s;
                """,
                {'id': id})


@connection.connection_handler
def get_status_by_status_id(cursor, status_id):
    cursor.execute("""
                SELECT title FROM statuses
                WHERE id = %(id)s;
                """, {'id': status_id})
    return cursor.fetchone()["title"]

@connection.connection_handler
def rename_board(cursor, board_id, new_title):
    cursor.execute("""
     UPDATE boards
                SET title = %(new_title)s
                WHERE id = %(board_id)s;
    """, {'new_title': new_title, 'board_id': board_id})
