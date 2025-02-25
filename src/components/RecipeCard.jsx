import PropTypes from "prop-types";
 
function RecipeCard({ recipe }) {
    return (
        <div style={recipeCardStyle}>
            <h3>{recipe.title}</h3>
            <p>Description: {recipe.description}</p>
        </div>
    )
}

export default RecipeCard;