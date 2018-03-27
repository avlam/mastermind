# Dependencies
import pandas as pd
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine
from flask import Flask, render_template, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy
import re
import os

# Flask App
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or 'sqlite:///db.sqlite'
db = SQLAlchemy(app)

class Game(db.Model):
    __tablename__ = 'play_history'

    record_id = db.Column(db.Integer, primary_key=True)
    player = db.Column(db.String(64))
    game = db.Column(db.Integer)
    password = guess = db.Column(db.Integer)
    guess = db.Column(db.Integer)
    guess_number = db.Column(db.Integer)
    right_digit = db.Column(db.Integer)
    right_place = db.Column(db.Integer)

def assign_game_id():
    current_max = pd.read_sql('SELECT max(game) FROM play_history',db.engine).fillna(0).loc[0][0]
    new_id = current_max + 1
    return new_id

# Create API routes
@app.route('/')
def home_template():
    return render_template('index.html')

# set route to allow download of game data
# ref: https://stackoverflow.com/questions/38634862/use-flask-to-convert-a-pandas-dataframe-to-csv-and-serve-a-download

@app.route('/log', methods=['POST'])
def send():
    this_game = pd.DataFrame(request.get_json())
    this_id = assign_game_id()
    this_game['game'] = [this_id for x in range(len(this_game))]
    this_game.rename({
        'index':'record_id',
        'playerName' : 'player',
        'guessNumber': 'guess_number',
        'rightDigitRightPlace' : 'right_place',
        'rightDigitWrongPlace' : 'right_digit',
        },axis='columns',inplace = True)
    print(this_game)
    this_game.to_sql('play_history',db.engine,if_exists='append',index=False)
    return jsonify({'msg':'success'})

@app.route('/data')
def show_data():
    return pd.read_sql('SELECT * FROM play_history',db.engine).to_json(orient='split')


# Flask app main
if __name__ == "__main__":
    app.run(debug=False)