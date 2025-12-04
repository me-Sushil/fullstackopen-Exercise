CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO
    blogs (author, url, title, likes)
VALUES (
        'Sushil',
        'https://example.com/first',
        'First Blog',
        0
    );

INSERT INTO
    blogs (author, url, title)
VALUES (
        'John wick',
        'https://example.com/second',
        'Second Blog'
    );