from config.db import db
from os import environ
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from datetime import timedelta
from config.blocklist import BLOCKLIST
from flask_cors import CORS
from resources.product_resource import Product, ProductList, ProductListBySku
from resources.user_resource import Profile, UserSignIn, TokenRefresh, UserSignOut, UserSignUp
from resources.favourite_resource import Favourite

# app configuration
app = Flask(__name__)

load_dotenv('config/.env')

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

db.init_app(app)

jwt = JWTManager(app)

CORS(app)

api = Api(app)

# jwt claims


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_data):
    return jwt_data['jti'] in BLOCKLIST


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_data):
    return jsonify({'error': True, 'data': {
        'message': 'The token has been revoked.',
        'error': 'token_revoked'
    }}), 401


@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({'error': True, 'data': {
        'message': 'The token has expired.',
        'error': 'token_expired'
    }}), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'error': True, 'data': {
        'message': 'Signature verification failed.',
        'error': 'invalid_token'
    }}), 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({'error': True, 'data': {
        'message': 'Request does not contain an access token.',
        'error': 'authorization_required'
    }}), 401


@jwt.needs_fresh_token_loader
def token_not_fresh_callback(error):
    return jsonify({'error': True, 'data': {
        'message': 'The token is not fresh.',
        'error': 'fresh_token_required'
    }}), 401


# users routes
api.add_resource(UserSignUp, '/api/users/signup')
api.add_resource(UserSignIn, '/api/users/signin')
api.add_resource(UserSignOut, '/api/users/signout')
api.add_resource(TokenRefresh, '/api/users/refresh')
api.add_resource(Profile, '/api/users/me')

# products routes
api.add_resource(Product, '/api/products/<int:product_id>')
api.add_resource(ProductList, '/api/products')
api.add_resource(ProductListBySku, '/api/products/search/<string:sku>')

# favourites routes
api.add_resource(Favourite, '/api/favourites/<int:product_id>')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
