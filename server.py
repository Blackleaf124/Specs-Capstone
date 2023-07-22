import os
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir,'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

########################################################

class Villager(db.model):
    __tablename__ = 'villagers'

    id = db.Column(db.integer, primary_key = True)
    name = db.Column(db.Text)
    skill = db.Column(db.Text)

    def __init__(self, name, skill):
        self.name = name
        self.skill = skill

    def __repr(self):
        return f"Villager {self.name} is skilled at {self.skill}."

########################################################

@app.route('/')
def index():
    return render_template('interface.html')

@app.route('/api/week')
def get_string():
    string = [1,2,3,4]
    return {"info": {
        "string": string
    }}

if __name__ == '__main__':
    app.run(debug=True)