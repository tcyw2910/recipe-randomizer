import { useState } from "react";

function Randomizer({ recipes }) {
    const [randomRecipe, setRandomRecipe] = useState(null);

    const getRandomRecipe = () => {
        if (recipes.length === 0) {
            alert("No recipes availble. Please add some first!");
            return;
        }
        const randomIndex = Math.floor(Math.random() * recipes.length);
        setRandomRecipe(recipes[randomIndex]);
    };

    return (
        <div className="text-center">
            <button 
                className="bg-yellow-600 text-white rounded-lg p-3 border-2 border-gray-700 hover:bg-yellow-700 transition duration-200 mt-5" 
                onClick={getRandomRecipe}
            >
                Pick a recipe!
            </button>

            {randomRecipe && (
                <div>
                    <h3>{randomRecipe.title}</h3>
                    <p>Description: {randomRecipe.description}</p>

                    <h4>Ingredients</h4>
                    <ul>
                        {randomRecipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    <h4>Instructions</h4>
                    <ol>
                        {randomRecipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

export default Randomizer;