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

    // Function to handle 'Enter' keypress for Instruction inputs
    const handleInstructionKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addInstruction();
        }
    };

    // Function to handle 'Enter' keypress for Ingredient inputs
    const handleIngredientKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addIngredient();
        }
    };

    return (
        <div className="container mx-auto mt-5 text-center custom-border p-2 rounded-xl">
            <div className="bg-red-500 p-4" style={{ background: '#EAA965' }}>
                <form onSubmit={handleSubmit}>
                    {/* Recipe Title */}
                    <h3 className="form-headers">Recipe Title</h3>
                    <div className="custom-border custom-form-input-style p-2 flex items-center justify-center">
                        {/* User enters the name of the recipe here */}
                        <input 
                            type="text"
                            placeholder="Recipe Title"
                            className="form-fields w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Description of recipe */}
                    <h3 className="form-headers">Description</h3>
                    <div className="custom-border custom-form-input-style p-3 flex items-center justify-center pb-1">
                        {/* User provides a short description on said recipe here */}
                        <textarea 
                            placeholder="Short description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="form-fields w-full resize-y min-h-[100px] outline-none "
                        />
                    </div>

                    <div>
                        <div className="flex justify-center items-center">
                            <div className="custom-border custom-form-input-style w-75">
                                <div className="flex items-center justify-center gap-2">
                                    <input 
                                        placeholder="Add Ingredient"
                                        type="text"
                                        value={ingredientInput}
                                        onChange={(e) => setIngredientInput(e.target.value)}
                                        onKeyDown={handleIngredientKeyPress}
                                        className="form-fields w-1/2 mt-2"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={addIngredient} 
                                        className="form-btns p-1 px-3"
                                    >
                                        Add Ingredient
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* If at least one item is detected in the list -> display container */}
                        {ingredients.length > 0 && (
                            <div className="flex justify-center items-center">
                                <div className="custom-border custom-form-input-style p-2 w-100">
                                    <ul className="p-2 rounded" style={{ background: '#ddd9cc' }}>
                                        {ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="custom-border custom-form-input-style p-2 w-150">
                            <input 
                                placeholder="Enter instructions"
                                type="text"
                                value={instructionInput}
                                onChange={(e) => {setInstructionInput(e.target.value)}}
                                onKeyDown={handleInstructionKeyPress}
                                className="form-fields w-140"
                            />
                            <button 
                                type="button" 
                                onClick={addInstruction} 
                                className="form-btns ml-2 p-1"
                            >
                                Add Instruction
                            </button>
                        </div>
                    </div>  

                    {/* If at least one item is detected in the list -> display container */}
                    {instructions.length > 0 && (
                        <div className="flex justify-center items-center">
                            <div className="custom-border custom-form-input-style p-2 w-full">
                                <ol className="p2 rounded" style={{ background: '#ddd9cc' }}>
                                    {instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ol>
                            </div> 
                        </div>
                    )}
                    
                    {/* Submit new recipe form data */}
                    <button type="submit" className="form-btns p-2 mt-4">Save Recipe</button>

                    {/* Successful Submission Message */}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                
                </form>
            </div>
        </div>
        
        
    );
}

export default RecipeForm;