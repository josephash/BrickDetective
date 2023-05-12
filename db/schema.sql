DROP DATABASE IF EXISTS lego_db;
CREATE DATABASE lego_db;

USE lego_db;

-- LEGO catalog database
CREATE TABLE themes (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(40),
    parent_id INT,
    FOREIGN KEY (parent_id)
    REFERENCES themes(id)
    ON DELETE SET NULL
);

CREATE TABLE sets (
    set_num VARCHAR(20) NOT NULL PRIMARY KEY,
    name VARCHAR(256),
    year INT,
    theme_id INT,
    num_parts INT,
    FOREIGN KEY (theme_id)
    REFERENCES themes(id)
    ON DELETE SET NULL
);

CREATE TABLE inventories (
    id INT NOT NULL PRIMARY KEY,
    version INT,
    set_num VARCHAR(20),
    FOREIGN KEY (set_num)
    REFERENCES sets(set_num)
    ON DELETE SET NULL
);

CREATE TABLE part_categories (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(200)
);

CREATE TABLE parts (
    part_num VARCHAR(20) NOT NULL PRIMARY KEY,
    name VARCHAR(250),
    part_cat_id INT,
    FOREIGN KEY (part_cat_id)
    REFERENCES part_categories(id)
    ON DELETE SET NULL
);

CREATE TABLE colors (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(200),
    rgb VARCHAR(6),
    is_trans BOOLEAN DEFAULT 0
);

CREATE TABLE inventory_parts (
    inventory_id INT,
    part_num VARCHAR(20),
    color_id INT,
    quantity INT NOT NULL,
    is_spare BOOLEAN DEFAULT 0,
    FOREIGN KEY (inventory_id)
    REFERENCES inventories(id)
    ON DELETE SET NULL,
    FOREIGN KEY (part_num)
    REFERENCES parts(part_num)
    ON DELETE SET NULL,
    FOREIGN KEY (color_id)
    REFERENCES colors(id)
    ON DELETE SET NULL
);

CREATE TABLE part_relationships (
    rel_type VARCHAR(1),
    child_part_num VARCHAR(20),
    parent_part_num VARCHAR(20),
    FOREIGN KEY (child_part_num)
    REFERENCES parts(part_num)
    ON DELETE SET NULL,
    FOREIGN KEY (parent_part_num)
    REFERENCES parts(part_num)
    ON DELETE SET NULL
);

CREATE TABLE elements (
    element_id VARCHAR(10) NOT NULL PRIMARY KEY,
    part_num VARCHAR(20),
    color_id INT,
    FOREIGN KEY (part_num)
    REFERENCES parts(part_num)
    ON DELETE SET NULL,
    FOREIGN KEY (color_id)
    REFERENCES colors(id)
    ON DELETE SET NULL
);

CREATE TABLE minifigs (
    fig_num VARCHAR(20) NOT NULL PRIMARY KEY,
    name VARCHAR(256),
    num_parts INT
);

CREATE TABLE inventory_minifigs (
    inventory_id INT,
    fig_num VARCHAR(20),
    quantity INT NOT NULL,
    FOREIGN KEY (inventory_id)
    REFERENCES inventories(id)
    ON DELETE SET NULL,
    FOREIGN KEY (fig_num)
    REFERENCES minifigs(fig_num)
    ON DELETE SET NULL
);

CREATE TABLE inventory_sets (
    inventory_id INT,
    set_num VARCHAR(20),
    quantity INT NOT NULL,
    FOREIGN KEY (inventory_id)
    REFERENCES inventories(id)
    ON DELETE SET NULL,
    FOREIGN KEY (set_num)
    REFERENCES sets(set_num)
    ON DELETE SET NULL
);

-- User database
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
);

CREATE TABLE user_inventories (
    user_id INT,
    part_num VARCHAR(20),
    color_id INT,
    quantity INT NOT NULL,
    is_spare BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL,
    FOREIGN KEY (part_num)
    REFERENCES parts(part_num)
    ON DELETE SET NULL,
    FOREIGN KEY (color_id)
    REFERENCES colors(id)
    ON DELETE SET NULL
);