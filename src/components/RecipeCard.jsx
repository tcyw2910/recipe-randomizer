import PropTypes from "prop-types";
 
function RecipeCard({ recipe }) {
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
        </div>
    )
}

export default RecipeCard;