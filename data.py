from server import db, Villager

db.create_all()

brian = Villager('Brian', 'wood')
alex = Villager('Alex', 'stone')
jeremy = Villager('Jeremy', 'food')


db.session.add_all([brian, alex, jeremy])

db.session.commit()

print(brian.id)
print(ale)