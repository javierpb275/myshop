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
_product_parser.add_argument('sku', type=str)
_product_parser.add_argument('created_at', type=datetime)
_product_parser.add_argument('modified_at', type=datetime)


class Product(Resource):

    def get(self, product_id):
        try:
            product = ProductModel.find_one(product_id=product_id)
            if not product:
                return {"error": True, "data": {"message": "Product Not Found"}}, 404
            return {"error": False,
                    "data": {
                        "message": "Product Found successfully.",
                        "product": product.json()
                    }}, 200
        except Exception as e:
            return {"error": True,
                    "data": {
                        "message": "Error Getting Product by id",
                        "error": str(e)
                    }}, 500


class ProductList(Resource):

    def get(self):
        try:
            args = request.args
            products = [product.json() for product in ProductModel.find_all(args.get("page"), args.get("per_page"), args.get('sort'), product_id=args.get("product_id"),
                                                                            name=args.get("name"), price=args.get("price"), stock=args.get("stock"),
                                                                            discount=args.get("discount"), sku=args.get("sku"))]
            return {"error": False,
                    "data": {
                        "message": f"{len(products)} Products Found",
                        "products": products
                    }}, 200
        except Exception as e:
            return {"error": True,
                    "data": {
                        "message": "Error Getting Products",
                        "error": str(e)
                    }}, 500


class ProductListBySku(Resource):

    def get(self, sku):
        try:
            args = request.args
            products = [product.json() for product in ProductModel.search_by_sku(
                args.get("page"), args.get("per_page"), args.get('sort'), sku)]
            return {"error": False,
                    "data": {
                        "message": f"{len(products)} Products Found",
                        "products": products
                    }}, 200
        except Exception as e:
            return {"error": True,
                    "data": {
                        "message": "Error Getting Products by SKU",
                        "error": str(e)
                    }}, 500
