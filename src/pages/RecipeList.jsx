import RecipeCard from "../components/RecipeCard";

function RecipeList({ recipes, deleteRecipe}) {
    return (
        <div>
            <h2 className="font-bold text-center my-5 text-2xl" style={{ color: '#FA910C'}}>Saved Recipes</h2>
            {recipes.length === 0 ? (
                <p className="text-center text-italic">No recipes added yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {recipes.map((recipe, index) => (
                        <RecipeCard 
                            key={index} 
                            recipe={recipe} 
                            deleteRecipe={deleteRecipe} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecipeList;