import PropTypes from "prop-types";
 
function RecipeCard({ recipe, deleteRecipe }) {
    const handleDelete = () => {
        // Ask for confirmation before deleting the recipe
        const confirmed = window.confirm(`Are you sure you want to delete the recipe: "${recipe.title}"?`);

        if (confirmed) {
            deleteRecipe(recipe.id);
        }
    };
    
    return (
        <div className="custom-border p-2 rounded">
            <div className="p-4" style={{ background: '#EAA965'}}>
                <h3 className="text-center font-bold mb-5 text-xl">{recipe.title}</h3>
                <p className="mb-6 text-center"><b>Description:</b><br></br>{recipe.description}</p>
                <h4 className="text-center"><b>Ingredients:</b></h4>
                <ul className="mb-6">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>✦ {ingredient}</li>
                    ))}
                </ul>

                <h4 className="text-center"><b>Instructions</b></h4>
                <ol className="list-decimal pl-4 space-y-4 marker:font-bold marker:text-black mb-5">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
                <div className="text-center">
                    <button onClick={(handleDelete)} className="border p-2 form-btns">Delete</button>
                </div>
                
            </div>
        </div>
        
        
    )
}

export default RecipeCard;