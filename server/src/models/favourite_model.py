from config.db import db
from datetime import datetime


class FavouriteModel(db.Model):
    __tablename__ = 'favourites'

    favourite_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'))
    created_at = db.Column(db.DateTime, default=datetime.now())
    modified_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('UserModel')
    product = db.relationship('ProductModel')

    def __init__(self, user_id, product_id):
        self.user_id = user_id
        self.product_id = product_id

    def json(self):
        return self.product.json()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def find_one(cls, **kwargs):
        return cls.query.filter_by(**kwargs).first()
