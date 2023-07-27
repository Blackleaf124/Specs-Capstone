from server import db, Villager, User, app

with app.app_context():
    db.create_all()

    brian = Villager('Brian', 'wood')
    alex = Villager('Alex', 'stone')
    jeremy = Villager('Jeremy', 'food')

    user1 = User("hunter@email.com", "1234")


    db.session.add_all([brian, alex, jeremy])
    db.session.add(user1)
    db.session.commit()



    print(brian.id)
    print(alex.id)
    print(user1.email)