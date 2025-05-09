import PropTypes from "prop-types";
import { useState } from 'react';
 
function RecipeCard({ recipe, deleteRecipe, updateRecipe }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

    const handleDelete = () => {
        // Ask for confirmation before deleting the recipe
        const confirmed = window.confirm(`Are you sure you want to delete the recipe: "${recipe.title}"?`);

        if (confirmed) {
            deleteRecipe(recipe.id);
        }
    };

    const handleEdit = (recipe) => {
        setEditedRecipe({
            ...recipe,
            ingredients: recipe.ingredients.join('\n'),
            instructions: recipe.instructions.join('\n'),
        });
        setIsEditing(true);
    };

    const cleanText = (text) => 
        text
            .split('\n') // use newline as delimiter
            .map((line) => line.trim()) // go through each line and remove empty spaces
            .filter(Boolean); // removes empty lines because an empty string is "falsy" in js
    

    const handleSave = () => {
        const cleanedIngredients = cleanText(editedRecipe.ingredients);
        const cleanedInstructions = cleanText(editedRecipe.instructions);

        updateRecipe({ // Send updated recipe back to parent
            ...editedRecipe,
            ingredients: cleanedIngredients,
            instructions: cleanedInstructions,
        }); 

        setIsEditing(false); // Set to false to close the modal
    }

    return (
        <div className="custom-border rounded">
            <div className="p-4" style={{ background: '#EAA965'}}>
                <div className="flex justify-between items-center mb-5">
                    {/* Edit Recipe Button */}
                    <button onClick={() => handleEdit(recipe)}>
                        <svg 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                            className="w-5 h-5 text-black"
                        > 
                            <path d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2V2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2v2zM6 16H4v4h4v-2H6v-2z" fill="currentColor"/>
                        </svg>
                    </button>
                    <h3 className="text-center font-bold text-xl flex-grow mr-5">{recipe.title}</h3>
                </div>
                
                {/* Recipe Short Description */}
                <p className="mb-6 text-center"><b>Description:</b>
                    <br></br>
                    {recipe.description}
                </p>

                {/* Ingredients */}
                <h4 className="text-center"><b>Ingredients:</b></h4>
                <div className="flex flex-col items-center">
                    <ul className="columns-1 sm:columns-2 lg:columns-3 mb-6">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>✦ {ingredient}</li>
                        ))}
                    </ul>
                </div>

                {/* Recipe Instructions */}
                <h4 className="text-center"><b>Instructions</b></h4>
                <ol className="list-decimal pl-4 space-y-4 marker:font-bold marker:text-black mb-5">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>

                {/* Handle Delete Recipe Function */}
                <div className="text-center">
                    <button onClick={(handleDelete)} className="border p-2 form-btns">
                        Delete
                    </button>
                </div>

                {/* Edit recipe modal */}
                {isEditing && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(80, 80, 80, 0.8)'}}>
                        <div className="p-6 rounded-lg max-w-4xl w-full" style={{ background: '#EAA965'}}>
                            <h2 className="text-center">Edit Recipe</h2>

                            {/* Edit title */}
                            <label>Recipe Title</label>
                            <div className="custom-border custom-form-input-style p-1 pr-3 mb-3">
                                <input
                                    type="text"
                                    className="w-full form-fields"
                                    value={editedRecipe.title}
                                    onChange={(e) => setEditedRecipe({ ...editedRecipe, title: e.target.value })}
                                />
                            </div>

                            {/* Edit description */}
                            <label>Description</label>
                            <div className="custom-border custom-form-input-style p-1 pr-3 mb-3">
                                <input 
                                    type="text"
                                    className="w-full form-fields"
                                    value={editedRecipe.description}
                                    onChange={(e) => setEditedRecipe({ ...editedRecipe, description: e.target.value })}
                                />
                            </div>

                            {/* Edit ingredients */}
                            <label>
                                Ingredients
                            </label>
                            <div className="custom-border custom-form-input-style p-1 pr-3 mb-3">
                                <textarea
                                    className="w-full form-fields"
                                    rows={7}
                                    value={editedRecipe.ingredients}
                                    onChange={(e) => setEditedRecipe({ 
                                        ...editedRecipe, 
                                        ingredients: e.target.value, // Store as a plain string
                                    })
                                }
                                 />
                            </div>

                            {/* Edit instructions */}
                            <label>
                                Instructions 
                            </label>
                            <div className="custom-border custom-form-input-style p-1 pr-3">
                                <textarea
                                    className="w-full form-fields"
                                    rows={7}
                                    value={editedRecipe.instructions}
                                    onChange={(e) => setEditedRecipe({
                                        ...editedRecipe,
                                        instructions: e.target.value, // Store as a plain string
                                    })}
                                >
                                </textarea>
                            </div>
                            
                            {/* Save edits */}
                            <div className="flex justify-end space-x-5">
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="button" onClick={handleSave}>Save</button>    
                            </div>
                        </div>           
                    </div>

                )}
            </div>
        </div>
    )
}

RecipeCard.PropTypes = {
    recipe: PropTypes.object.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    updateRecipe: PropTypes.func.isRequired,
};

export default RecipeCard;