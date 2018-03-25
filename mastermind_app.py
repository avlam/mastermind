# Dependencies
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, render_template, jsonify
# from flask_sqlalchemy import SQLAlchemy
import re
import os

# Flask App
app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or 'sqlite:///Instructions/DataSets/belly_button_biodiversity.sqlite'
# db = SQLAlchemy(app)

# # Database Setup
# sql_alchemy_database_uri = os.environ.get('DATABASE_URL', '') or 'sqlite:///Instructions/DataSets/belly_button_biodiversity.sqlite'
# engine = create_engine(sql_alchemy_database_uri)
# Base = automap_base()
# Base.prepare(engine, reflect = True)

# # bbb = belly button biodiversity
# # Base.metadata.tables.keys() returns dict_keys(['otu', 'samples', 'samples_metadata'])

# # Save references to table(s)
# otu = Base.classes.otu
# samples = Base.classes.samples
# s_meta = Base.classes.samples_metadata

# # Create Session
# session = Session(engine)


# Create API routes
# 1- Dashboard homepage
@app.route('/')
def home_template():
    return render_template('index.html')






# Flask app main
if __name__ == "__main__":
    app.run(debug=False)