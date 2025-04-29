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
        <div>
            <h3>{recipe.title}</h3>
            <p>Description: {recipe.description}</p>
            <h4>Ingredients</h4>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h4>Instructions</h4>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
            <button onClick={(handleDelete)}>Delete</button>
        </div>
        
    )
}

export default RecipeCard;