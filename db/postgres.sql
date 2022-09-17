CREATE DATABASE myshop_db;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    role VARCHAR(10) NOT NULL,
    username VARCHAR(40) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT
);