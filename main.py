from flask import Flask, render_template, url_for, redirect, jsonify
from flask import Flask, render_template, url_for, request
from util import json_response

import data_handler
import persistence

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)

@app.route('/add-board')
def add_board():

    persistence.add_board()
    return redirect('/')

@app.route('/add-card/<board_id>')
def add_card(board_id):

    persistence.add_card(board_id)
    return redirect('/')

@app.route('/delete-board/<board_id>')
def delete_board(board_id):

    persistence.delete_board(board_id)
    return redirect('/')

@app.route('/delete-card/<card_id>')
def delete_card(card_id):

    persistence.delete_card(card_id)
    return redirect('/')

@app.route('/rename-board', methods=['POST'])
def rename_board():
    title = request.json['title']
    board_id = request.json['board_id']
    data_handler.rename_board(board_id, title)
    return 'OK'


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
