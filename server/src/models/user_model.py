from config.db import db
from datetime import datetime
from helpers.filtration_helper import FiltrationHelper
from helpers.pagination_helper import PaginatonHelper


class UserModel(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.Text, nullable=True)
    avatar = db.Column(db.Text, nullable=True)
    username = db.Column(db.String(10), nullable=False)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    accept_terms_conditions = db.Column(db.Boolean, nullable=False)
    role = db.Column(db.String(10), default='USER')
    created_at = db.Column(db.DateTime, default=datetime.now())
    modified_at = db.Column(db.DateTime, default=datetime.now())

    def __init__(self, username, email, password, accept_terms_conditions, role, created_at, modified_at, first_name, last_name, phone, address, avatar):
        self.username = username
        self.email = email
        self.password = password
        self.role = role
        self.accept_terms_conditions = accept_terms_conditions
        self.created_at = created_at
        self.modified_at = modified_at
        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone
        self.address = address
        self.avatar = avatar

    def json(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'avatar': self.avatar,
            'created_at': str(self.created_at),
            'modified_at': str(self.modified_at),
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'address': self.address
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def _get_sort(cls, sort):
        if not sort:
            sort = cls.created_at.desc()
        else:
            if "user_id" in sort:
                sort_by = cls.user_id
            elif "username" in sort:
                sort_by = cls.username
            elif "email" in sort:
                sort_by = cls.email
            elif "first_name" in sort:
                sort_by = cls.first_name
            elif "last_name" in sort:
                sort_by = cls.last_name
            elif "phone" in sort:
                sort_by = cls.phone
            elif "address" in sort:
                sort_by = cls.address
            elif "created_at" in sort:
                sort_by = cls.created_at
            elif "modified_at" in sort:
                sort_by = cls.modified_at
            if sort[0] == '-':
                sort = sort_by.desc()
            else:
                sort = sort_by.asc()
        return sort

    @classmethod
    def find_all(cls, page, per_page, sort, **kwargs):
        FiltrationHelper.remove_keys_with_empty_values(kwargs)
        page, per_page = PaginatonHelper.get_pagination(page, per_page)
        sort = cls._get_sort(sort)
        return cls.query.filter_by(**kwargs).order_by(sort).paginate(page, per_page, error_out=False).items

    @classmethod
    def find_one(cls, **kwargs):
        return cls.query.filter_by(**kwargs).first()
