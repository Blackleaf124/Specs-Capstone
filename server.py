import os, random
from flask import Flask, render_template, jsonify, session, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.secret_key = "dev"

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir,'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

########################################################

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Villager(db.Model):
    __tablename__ = 'villagers'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Text)
    skill = db.Column(db.Text)

    def __init__(self, name, skill):
        self.name = name
        self.skill = skill

    def __repr__(self):
        return f"Villager {self.name} is skilled at {self.skill}."

    def as_dict(self):
        return {"name" : self.name, "skill" : self.skill}

########################################################

@app.route('/')
def index():
    if "user_email" in session:
        return render_template('interface.html')
    else:
        return render_template('login.html')
        

@app.route("/login", methods=["POST"])
def process_login():
    email = request.form.get("email")
    password = request.form.get("password")

    user = User.query.filter(User.email == email).first()
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")
    else:
        session["user_email"] = user.email
        flash(f"Welcome back, {user.email}!")

    return redirect("/")

@app.route('/api/week')
def pass_week():
    villagers = [villager.as_dict() for villager in Villager.query.all()]
    return jsonify({"villagers": {
        "list": villagers
    }})


names = ['Hunter', 'Andrew', 'Justin', 'Ethan', 'Timothy', 'Jenny', 'Arnold', 'Tyler', 'Jerome', 'Xavier', 'Charlie', 'Amanda', 'Witney', 'Rebecca', 'Tareesa']
skills = ['wood', 'stone', 'food']


@app.route('/api/newVil')
def create_villager():
    random_num_name = random.randrange(0, 15)
    chosen_name = names[random_num_name]
    random_num_skill = random.randrange(0, 3)
    chosen_skill = skills[random_num_skill]

    db.session.add(Villager(chosen_name, chosen_skill))
    db.session.commit()

    vil_list = [villager.as_dict() for villager in Villager.query.all()]

    new_vil = vil_list[-1]

    return jsonify({"new": {
        "vil": new_vil
    }})
    
if __name__ == '__main__':
    app.run(debug=True)