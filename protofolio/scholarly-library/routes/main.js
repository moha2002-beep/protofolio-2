const { Router } = require("express");
const db = require("../db/db");
const router = Router();

// Home Page
router.get("/", (req, res) => {
  res.render("home");
});

// About Page
router.get("/about", (req, res) => {
  res.render("about");
});

// Display All Materials
router.get("/materials", (req, res) => {
  const sqlQuery = `
    SELECT 
      materials.id, 
      materials.title, 
      materials.price, 
      categories.name AS category, 
      GROUP_CONCAT(authors.name SEPARATOR ', ') AS authors
    FROM materials
    LEFT JOIN categories ON materials.category_id = categories.id
    LEFT JOIN material_authors ON materials.id = material_authors.material_id
    LEFT JOIN authors ON material_authors.author_id = authors.id
    GROUP BY materials.id
  `;
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.render("materials/materials", { materials: result });
  });
});

// Add Material Form
router.get("/addmaterial", (req, res) => {
  const sqlQueryCategories = "SELECT * FROM categories";
  const sqlQueryAuthors = "SELECT * FROM authors";

  db.query(sqlQueryCategories, (err, categories) => {
    if (err) throw err;
    db.query(sqlQueryAuthors, (err, authors) => {
      if (err) throw err;
      res.render("materials/addmaterial", { categories, authors });
    });
  });
});

// Save Material to Database
router.post("/materialadded", (req, res) => {
  const { title, author_id, price, category_id } = req.body;
  const sqlInsertMaterial =
    "INSERT INTO materials (title, price, category_id) VALUES (?, ?, ?)";

  db.query(sqlInsertMaterial, [title, price, category_id], (err, result) => {
    if (err) throw err;

    const materialId = result.insertId;
    const sqlInsertMaterialAuthor =
      "INSERT INTO material_authors (material_id, author_id) VALUES (?, ?)";

    db.query(
      sqlInsertMaterialAuthor,
      [materialId, author_id],
      (err, result) => {
        if (err) throw err;
        res.redirect("/materials");
      }
    );
  });
});

// Display All Authors
router.get("/authors", (req, res) => {
  const sqlQuery = "SELECT * FROM authors";
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.render("authors/authors", { authors: result });
  });
});

// Add Author Form
router.get("/addauthor", (req, res) => {
  res.render("authors/addauthor");
});

// Save Author to Database
router.post("/authoradded", (req, res) => {
  const { name } = req.body;
  const sqlQuery = "INSERT INTO authors (name) VALUES (?)";
  db.query(sqlQuery, [name], (err, result) => {
    if (err) throw err;
    res.redirect("/authors");
  });
});

// Edit Author Form
router.get("/editauthor/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM authors WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) throw err;
    res.render("authors/editauthor", { author: result[0] });
  });
});

// Update Author
router.post("/updateauthor/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sqlQuery = "UPDATE authors SET name = ? WHERE id = ?";
  db.query(sqlQuery, [name, id], (err, result) => {
    if (err) throw err;
    res.redirect("/authors");
  });
});

// Delete Author
router.post("/deleteauthor/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM authors WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/authors");
  });
});

// Display All Categories
router.get("/categories", (req, res) => {
  const sqlQuery = "SELECT * FROM categories";
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.render("categories/categories", { categories: result });
  });
});

// Add Category Form
router.get("/addcategory", (req, res) => {
  res.render("categories/addcategory");
});

// Save Category to Database
router.post("/categoryadded", (req, res) => {
  const { name } = req.body;
  const sqlQuery = "INSERT INTO categories (name) VALUES (?)";
  db.query(sqlQuery, [name], (err, result) => {
    if (err) throw err;
    res.redirect("/categories");
  });
});

// Edit Category Form
router.get("/editcategory/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM categories WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) throw err;
    res.render("categories/editcategory", { category: result[0] });
  });
});

// Update Category
router.post("/updatecategory/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sqlQuery = "UPDATE categories SET name = ? WHERE id = ?";
  db.query(sqlQuery, [name, id], (err, result) => {
    if (err) throw err;
    res.redirect("/categories");
  });
});

// Delete Category
router.post("/deletecategory/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM categories WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/categories");
  });
});

// Search Page
router.get("/search", (req, res) => {
  res.render("search/search");
});

// Handle Search Request
router.post("/search", (req, res) => {
  const { query } = req.body;
  const sqlQuery = `
    SELECT 'material' AS type, title AS name FROM materials WHERE title LIKE ?
    UNION
    SELECT 'author' AS type, name FROM authors WHERE name LIKE ?
    UNION
    SELECT 'category' AS type, name FROM categories WHERE name LIKE ?
  `;
  const searchTerm = `%${query}%`;
  db.query(sqlQuery, [searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) throw err;
    res.render("search/searchresults", { results, query });
  });
});

router.post("/deletematerial/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM materials WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/materials");
  });
});

// Edit Material Form
router.get("/editmaterial/:id", (req, res) => {
  const { id } = req.params;
  const sqlQueryMaterial = "SELECT * FROM materials WHERE id = ?";
  const sqlQueryCategories = "SELECT * FROM categories";
  const sqlQueryAuthors = "SELECT * FROM authors";

  db.query(sqlQueryMaterial, [id], (err, materialResult) => {
    if (err) throw err;
    db.query(sqlQueryCategories, (err, categories) => {
      if (err) throw err;
      db.query(sqlQueryAuthors, (err, authors) => {
        if (err) throw err;
        res.render("materials/editmaterial", {
          material: materialResult[0],
          categories,
          authors,
        });
      });
    });
  });
});

// Update Material
router.post("/updatematerial/:id", (req, res) => {
  const { id } = req.params;
  const { title, author_id, price, category_id } = req.body;
  const sqlQuery =
    "UPDATE materials SET title = ?, price = ?, category_id = ? WHERE id = ?";
  db.query(sqlQuery, [title, price, category_id, id], (err, result) => {
    if (err) throw err;
    res.redirect("/materials");
  });
});

module.exports = router;
