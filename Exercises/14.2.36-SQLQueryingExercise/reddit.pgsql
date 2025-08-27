DROP DATABASE reddit_db;
CREATE DATABASE reddit_db;
\c reddit_db;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    comment_text TEXT NOT NULL
);

CREATE TABLE subreddits
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(15) NOT NULL,
    description TEXT,
    subscribers INTEGER CHECK (subscribers >= 1) DEFAULT 1,
    is_private BOOLEAN DEFAULT false
);

INSERT INTO users (username, password)
VALUES
('graylady', 'fhdsjfds'),
('stevie-chicks', 'fjdkjfdsl');

INSERT INTO subreddits (name,user_id)
VALUES
('chickens', 2),
('waterluvers', 1);
