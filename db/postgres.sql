CREATE DATABASE myshop_db;

--USER TABLE
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    role VARCHAR(10) NOT NULL,
    username VARCHAR(10) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    address TEXT,
    accept_terms_conditions BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--PRODUCT TABLE
CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    price DECIMAL NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    stock INT NOT NULL,
    discount DECIMAL NOT NULL DEFAULT 0.00,
    SKU VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--USERS
INSERT INTO users(user_id, role, username, email, 
password, avatar, first_name, last_name, phone, address, accept_terms_conditions, created_at, modified_at)
VALUES (1, 'ADMIN', 'pepe', 'pepe@gmail.com', 
'pbkdf2:sha256:260000$TGMEL1gHzqF6SoEQ$005e36d760d78f0b3df08abdc0f757ad197b44f2f7c04c8467ab03158198c01e', 
NULL, NULL, NULL, NULL, NULL, TRUE, '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');

INSERT INTO users(user_id, role, username, email, 
password, avatar, first_name, last_name, phone, address, accept_terms_conditions, created_at, modified_at)
VALUES (2, 'USER', 'paco', 'paco@gmail.com', 
'pbkdf2:sha256:260000$TGMEL1gHzqF6SoEQ$005e36d760d78f0b3df08abdc0f757ad197b44f2f7c04c8467ab03158198c01e', 
'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png', 
'Paco', 'Rodríguez Pérez', '678901234', '123 John Doe Street, 3ºA Floor', TRUE, '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');

--PRODUCTS
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, SKU, created_at, modified_at)
VALUES (1, 'BEST WALKING SHOES FOR WOMEN', 50.00, 
'./images/best-walking-shoes-for-women.png', 
NULL, 100, 0.00, 'WM-SH-WH-ME', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');

INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, SKU, created_at, modified_at)
VALUES (2, 'BOTTEGA SENATORE CLOVIO SNEAKERS ITALIAN HANDMADE MAN SHOES HIGH QUALITY LEATHER SHOES', 100.00,
'./images/bottega-senatore-clovio-sneakers-italian-handmade-man-shoes-high-quality-leather-shoes.jpg', 
NULL, 0, 20.00, 'ME-SH-GR-LG', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');