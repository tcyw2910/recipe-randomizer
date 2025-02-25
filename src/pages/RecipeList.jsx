import RecipeCard from "../components/RecipeCard";

function RecipeList({ recipes }) {
    return (
        <div>
            <h2>Saved Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes added yet.</p>
            ) : (
                <div>
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecipeList;