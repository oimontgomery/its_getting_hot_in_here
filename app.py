import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///hot.sqlite" 
db = SQLAlchemy(app)

# Create our database model
class Climate(db.Model):
    __tablename__ = 'hot'

    index = db.Column(db.Integer, primary_key=True)
    Declaration_year = db.Column(db.String)
    Disaster_Type = db.Column(db.String)
    Disaster_Count = db.Column(db.Integer)
    Avg_Temp = db.Column(db.String)

    def __repr__(self):
        return '<Emoji %r>' % (self.index)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/csv")
def csv_data():
    csv_1 = pd.read_csv("Joined_Data.csv")
    return csv_1.to_json(orient="records")

@app.route("/csv_2")
def csv_data2():
    csv_2 = pd.read_csv("data/data.csv")
    return csv_2.to_json(orient="records")

@app.route("/climate_data")
def climate_data():

    results = db.session.query(Climate.Declaration_year, Climate.Disaster_Type, Climate.Disaster_Count, Climate.Avg_Temp).all()

    
    return jsonify(results)


if __name__ == "__main__":
    app.run()