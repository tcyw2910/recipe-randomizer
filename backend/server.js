const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// PostgreSQL Connection
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// GET route to fetch recipes
app.get("/recipes", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM recipes");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

// POST route to add a new recipe
app.post("/recipes", async (req, res) => {
    try {
        const { title, description, ingredients, instructions } = req.body // Get data from request

        // Check all fields are provided
        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await pool.query(
            "INSERT INTO recipes (title, description, ingredients, instructions) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, ingredients, instructions]
        );

        res.status(201).json(result.rows[0]); // Send back the inserted recipe
    } catch (err) {
        console.error("Error inserting recipe: ", err);
        res.status(500).json({ error: "Failed to insert recipe" });
    }
})

// Delete route to remove a recipe by ID
app.delete("/recipes/:id", async (req, res) => {
    const { id } = req.params; // Extract id from request parameters
    try {
        const result = await pool.query("DELETE FROM recipes WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({error: "Recipe not found" });
        }

        // Send a success message and the deleted recipe info
        res.json({ message: "Recipe deleted successfully", deletedRecipe: result.rows[0] })
    } catch (err) {
        console.error("Error deleting recipe: ", err);
        res.status(500).json({ error: "Failed to delete recipe" });
    } 
});

// PUT route to edit an existing recipe by ID
app.put("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, ingredients, instructions } = req.body;

    // Check all fields are provided
    if (!title || !description || !ingredients || !instructions) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await pool.query(
            "UPDATE recipes SET title = $1, description = $2,  ingredients = $3, instructions = $4 WHERE id = $5 RETURNING *",
            [title, description, ingredients, instructions, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.json(result.rows[0]); // Send back the updated recipe
    } catch (err) {
        console.error("Error updating recipe:", err);
        res.status(500).json({ error: "Failed to update recipe" });
    }
});