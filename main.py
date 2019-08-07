from flask import Flask, render_template, url_for, redirect, jsonify, session
from flask import Flask, render_template, url_for, request
from util import json_response

import data_handler
import persistence
import util

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

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


@app.route('/update-status', methods=['POST'])
def update_status():
    card_id = request.json['id']
    status = request.json['status']
    data_handler.update_status(card_id, status)
    return 'OK'


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        new_data = request.form.to_dict()
        try:
            persistence.add_new_user(new_data)
        except:
            return render_template('registration.html', username=request.form.get('username'),
                                   action_route='/registration')
        return redirect('/')
    return render_template('registration.html', action_route='/registration')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        try:
            hashed_password = persistence.get_hashed_password_for_user(username)
        except TypeError:
            return render_template('registration.html', login='failed', action_route='/login')
        if util.verify_password(password, hashed_password):
            session['username'] = username
            return redirect('/')
        else:
            return render_template('registration.html', login='failed', action_route='/login')
    return render_template('registration.html', action_route='/login')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))



if __name__ == '__main__':
    main()
