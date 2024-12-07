USE scholarly_library;

-- Insert sample data into categories table
INSERT INTO
    categories (name)
VALUES
    ('Science'),
    ('Mathematics'),
    ('Literature'),
    ('History'),
    ('Technology');

-- Insert sample data into materials table
INSERT INTO
    materials (title, price, category_id)
VALUES
    ('A Brief History of Time', 15.99, 1),
    ('The Theory of Everything', 18.50, 1),
    ('Calculus Made Easy', 12.99, 2),
    ('The Great Gatsby', 10.99, 3),
    ('1984', 8.99, 3),
    ('Sapiens: A Brief History of Humankind', 20.00, 4),
    ('The Innovators', 25.00, 5),
    ('Clean Code', 30.00, 5);

-- Insert sample data into authors table
INSERT INTO authors (name) VALUES
    ('Stephen Hawking'),
    ('Silvanus P. Thompson'),
    ('F. Scott Fitzgerald'),
    ('George Orwell'),
    ('Yuval Noah Harari'),
    ('Walter Isaacson'),
    ('Robert C. Martin');

-- Insert sample data into material_authors table
INSERT INTO material_authors (material_id, author_id) VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 3),
    (5, 4),
    (6, 5),
    (7, 6),
    (8, 7);
