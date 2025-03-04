import { useState } from "react";

function RecipeForm( {addRecipe} ) {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [description, setDescription] = useState("");
    const [ingredientInput, setIngredientInput] = useState("");
    const [instructionInput, setInstructionInput] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() && description.trim() && ingredients.length > 0 && instructions.length > 0) {
            const newRecipe = { title, description, ingredients, instructions };

            try {
                const response = await fetch("http://localhost:5000/recipes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(newRecipe),
                });

                if (!response.ok) {
                    throw new Error("Failed to add recipe");
                }

                const data = await response.json();
                addRecipe((prevRecipes) => [...prevRecipes, data]); // Update state in App.js

                // Set success message
                setSuccessMessage("Recipe added successfully");

                // Clear form after successful submission
                setTitle("");
                setDescription("");
                setIngredients([]);
                setInstructions([]);
                setIngredientInput("");
                setInstructionInput("");

                // Hide the message after 3 seconds
                setTimeout(() => setSuccessMessage(""), 3000);
            } catch (error) {
                console.error("Error adding recipe", error);
            }
        }
    };

    // Function - Add a list of ingredients
    const addIngredient = () => {
        if (ingredientInput.trim()) {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput("");
        }
    };

    // Function - Add a list of instructions
    const addInstruction = () => {
        if (instructionInput.trim()) {
            setInstructions([...instructions, instructionInput.trim()]);
            setInstructionInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Recipe Title</h3>
            <input 
                type="text"
                placeholder="Recipe Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <h3>Description</h3>
            <textarea 
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <div>
                <input 
                    placeholder="Add Ingredient"
                    type="text"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                />
                <button type="button" onClick={addIngredient}>Add Ingredient</button>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div>
                <input 
                    placeholder="Enter instructions"
                    type="text"
                    value={instructionInput}
                    onChange={(e) => {setInstructionInput(e.target.value)}}
                />
                <button type="button" onClick={addInstruction}>Add Instruction</button>
                <ol>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>

            <button type="submit">Save Recipe</button>

            {/* Successful Submission Message */}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Submission Error Message */}
            
        </form>
    );
}

export default RecipeForm;