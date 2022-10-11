from datetime import datetime
from models.product_model import ProductModel
from flask_restful import Resource, reqparse
from flask import request

_product_parser = reqparse.RequestParser()
_product_parser.add_argument('name', type=str)
_product_parser.add_argument('price', type=float)
_product_parser.add_argument('image_url', type=str)
_product_parser.add_argument('description', type=str)
_product_parser.add_argument('stock', type=int)
_product_parser.add_argument('discount', type=float)
_product_parser.add_argument('SKU', type=str)
_product_parser.add_argument('created_at', type=datetime)
_product_parser.add_argument('modified_at', type=datetime)


class Product(Resource):

    def get(self, product_id):
        product = ProductModel.find_one(product_id=product_id)
        if not product:
            return {"error": True, "data": {"message": "Product Not Found"}}, 404
        return {"error": False,
                "data": {
                    "message": "Product Found successfully.",
                    "product": product.json()
                }}, 200


class ProductList(Resource):

    def get(self):
        args = request.args
        products = [product.json() for product in ProductModel.find_all(args.get("page"), args.get("per_page"), args.get('sort'), product_id=args.get("product_id"),
                                                                        name=args.get("name"), price=args.get("price"), stock=args.get("stock"),
                                                                        discount=args.get("discount"), SKU=args.get("SKU"))]
        return {"error": False,
                "data": {
                    "message": f"{len(products)} Products Found",
                    "products": products
                }}, 200
