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
    sku VARCHAR(50) NOT NULL,
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

--t-shirts:

--men
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (1, 'Bayside Apparel Men Basic T-Shirt', 9.99,
'./images/bayside-apparel-mens-basic-t-shirt.jpg', 
NULL, 0, 0.00, 'ME-TS-GR-LG', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (2, 'JHK T-Shirt Men', 9.99,
'./images/jhk-t-shirt-men.jpg', 
NULL, 20, 10.00, 'ME-TS-YE-ME', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--women
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (3, 'JHK T-Shirt Women', 9.99,
'./images/jhk-t-shirt-women.jpg', 
NULL, 20, 10.00, 'WM-TS-OR-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (4, 'Nia Dacosta T-Shirt', 17.50,
'./images/nia-dacosta-t-shirt.jpg', 
NULL, 30, 0.00, 'WM-TS-WH-ME', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--children
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (5, 'El Galeon Kids T-Shirt', 5.00,
'./images/kids-t-shirt-el-galeon.jpg', 
NULL, 40, 0.00, 'CH-TS-WH-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (6, 'Thomas Little Train T-Shirt', 5.00,
'./images/thomas-little-train-t-shirt.jpg', 
NULL, 0, 0.00, 'CH-TS-WH-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');


--shoes:

--men
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (7, 'Bottega Senatore Clovio Sneakers Italian Handmade Man Shoes', 100.00,
'./images/bottega-senatore-clovio-sneakers-italian-handmade-man-shoes-high-quality-leather-shoes.jpg', 
NULL, 0, 20.00, 'ME-SH-GY-LG', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--women
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (8, 'Best Walking Shoes For Women', 50.00, 
'./images/best-walking-shoes-for-women.png', 
NULL, 100, 0.00, 'WM-SH-WH-ME', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--children
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (9, 'Lace Up Brogues Shoe Black', 24.95,
'./images/lace-up-brogues-shoe-black.jpg', 
NULL, 23, 10.00, 'CH-SH-BK-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (10, 'Mickey Mouse Shoes', 29.62,
'./images/mickey-mouse-shoes.jpg', 
NULL, 10, 0.00, 'CH-SH-PI-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');

--jackets:

--children
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (11, 'Boy Coat Jacket Debenham', 47.43,
'./images/boy-coats-jackets-debenhams.jpeg', 
NULL, 50, 10.00, 'CH-JA-GR-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (12, 'Coat Colegio Gamarra', 35.89,
'./images/children-designer-coats-colegio-gamarra.jpg', 
NULL, 40, 0.00, 'CH-JA-BK-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--women
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (13, 'Women Fall Jacket', 80.00,
'./images/fall-jackets-amazon.png', 
NULL, 20, 20.00, 'WM-JA-BK-LG', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (14, 'Women Iconic Australia Jacket', 70.00,
'./images/iconic-women-coats-jackets-australia.jpg', 
NULL, 30, 0.00, 'WM-JA-BW-LG', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--men
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (15, 'Men Black Jacket', 50.00,
'./images/mens-coats-jackets.jpg', 
NULL, 40, 10.00, 'ME-JA-BK-ME', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (16, 'Winter Jacket Windcheater', 35.00,
'./images/winter-jacket-windcheater-men.jpg', 
NULL, 40, 0.00, 'ME-JA-BL-ME', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');

--trousers:

--children
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (17, 'Boys Cargo Pants', 25.50,
'./images/boys-cargo-pants.jpg', 
NULL, 30, 0.00, 'CH-TR-GR-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (18, 'John Lewis Kids Plain Cargo Trousers Khaki', 35.50,
'./images/john-lewis-kids-plain-cargo-trousers-khaki.jpg', 
NULL, 30, 10.00, 'CH-TR-GR-SM', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--men
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (19, 'Fjallraven Vidda Pro', 35.00,
'./images/fjallraven-vidda-pro.jpg',
NULL, 50, 0.00, 'ME-TR-BK-LG', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
--women
INSERT INTO products(product_id, name, price, 
image_url, 
description, stock, discount, sku, created_at, modified_at)
VALUES (20, 'Tailored Straight Leg Trousers Taupe', 85.00,
'./images/tailored-straight-leg-trousers-taupe.jpg',
NULL, 30, 20.00, 'WM-TR-BW-LG', '2022-09-20 17:53:30.705485', '2022-09-20 17:53:30.705485');
