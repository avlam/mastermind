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

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or 'sqlite:///db.sqlite'
db = SQLAlchemy(app)

class game(db.Model):
    __tablename__ = 'game'

    record_id = db.Column(db.Integer, primary_key=True)
    player = db.Column(db.String(64))
    password = guess = db.Column(db.Float)
    guess = db.Column(db.Float)
    right_digit = db.Column(db.Float)
    right_place = db.Column(db.Float)

# # Database Setup
# sql_alchemy_database_uri = os.environ.get('DATABASE_URL', '') or 'sqlite:///Instructions/DataSets/belly_button_biodiversity.sqlite'
# engine = create_engine(sql_alchemy_database_uri)
# Base = automap_base()
# Base.prepare(engine, reflect = True)

# # Create Session
# session = Session(engine)


# Create API routes
@app.route('/')
def home_template():
    return render_template('index.html')






# Flask app main
if __name__ == "__main__":
    app.run(debug=False)