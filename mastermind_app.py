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

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or 'sqlite:///db.sqlite'
# db = SQLAlchemy(app)

# class game(db.Model):
#     __tablename__ = 'game'

#     record_id = db.Column(db.Integer, primary_key=True)
#     player = db.Column(db.String(64))
#     password = guess = db.Column(db.Float)
#     guess = db.Column(db.Float)
#     right_digit = db.Column(db.Float)
#     right_place = db.Column(db.Float)

# Create API routes
@app.route('/')
def home_template():
    return render_template('index.html')

# set route to allow download of game data
# ref: https://stackoverflow.com/questions/38634862/use-flask-to-convert-a-pandas-dataframe-to-csv-and-serve-a-download

# @app.route('/log', methods=['GET','POST'])
# def send():
#     if method == 'POST':
#         # this_game = DEFINE entry
#         db.session.add(this_game)
#         db.session.commit()
#     pass


# Flask app main
if __name__ == "__main__":
    app.run(debug=False)