from models.favourite_model import FavouriteModel
from models.user_model import UserModel
from models.product_model import ProductModel
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required


class Favourite(Resource):

    @jwt_required()
    def post(self, product_id):
        try:
            user_id = get_jwt_identity()
            user = UserModel.find_one(user_id=user_id)
            if not user:
                return {"error": True, "data": {"message": "User Not Found"}}, 404
            product = ProductModel.find_one(product_id=product_id)
            if not product:
                return {"error": True, "data": {"message": "Product Not Found"}}, 404
            favourite = FavouriteModel.find_one(
                user_id=user_id, product_id=product_id)
            if favourite:
                return {"error": True, "data": {"message": "You already have that product in favourites"}}, 400
            new_favourite = FavouriteModel(user_id, product_id)
            new_favourite.save_to_db()
            return {"error": False,
                    "data": {
                        "message": "Product added to Favourites successfully!",
                        "product": new_favourite.json()
                    }}, 200
        except Exception as e:
            return {"error": True,
                    "data": {
                        "message": "Error Adding Product To Favourites",
                        "error": str(e)
                    }}, 400

    @jwt_required()
    def delete(self, product_id):
        try:
            user_id = get_jwt_identity()
            user = UserModel.find_one(user_id=user_id)
            if not user:
                return {"error": True, "data": {"message": "User Not Found"}}, 404
            product = ProductModel.find_one(product_id=product_id)
            if not product:
                return {"error": True, "data": {"message": "Product Not Found"}}, 404
            favourite = FavouriteModel.find_one(
                user_id=user_id, product_id=product_id)
            if not favourite:
                return {"error": True, "data": {"message": "Favourite Not Found"}}, 404
            favourite.delete_from_db()
            return {"error": False,
                    "data": {
                        "message": "Removed Product from Favourites successfully!"
                    }}, 200
        except Exception as e:
            return {"error": True,
                    "data": {
                        "message": "Error Removing Product From Favourites",
                        "error": str(e)
                    }}, 400
