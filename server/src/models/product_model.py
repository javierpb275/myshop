from config.db import db
from datetime import datetime
from helpers.filtration_helper import FiltrationHelper
from helpers.pagination_helper import PaginatonHelper


class ProductModel(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)
    stock = db.Column(db.Integer, nullable=False)
    discount = db.Column(db.Numeric(precision=2, scale=2), default=0.00)
    SKU = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    modified_at = db.Column(db.DateTime, default=datetime.now())

    def __init__(self, name, price, image_url, description, stock, discount, SKU, created_at, modified_at):
        self.name = name
        self.price = price
        self.image_url = image_url
        self.description = description
        self.stock = stock
        self.discount = discount
        self.SKU = SKU
        self.created_at = created_at
        self.modified_at = modified_at

    def json(self):
        return {
            'product_id': self.product_id,
            'name': self.name,
            'price': self.price,
            'image_url': self.image_url,
            'description': self.description,
            'stock': self.stock,
            'discount': self.discount,
            'SKU': self.SKU,
            'created_at': str(self.created_at),
            'modified_at': str(self.modified_at),
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
            if "product_id" in sort:
                sort_by = cls.product_id
            elif "name" in sort:
                sort_by = cls.name
            elif "price" in sort:
                sort_by = cls.price
            elif "stock" in sort:
                sort_by = cls.stock
            elif "discount" in sort:
                sort_by = cls.discount
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
