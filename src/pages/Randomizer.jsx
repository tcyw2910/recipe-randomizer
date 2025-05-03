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
                className="bg-yellow-600 text-white rounded-lg p-3 border-2 border-gray-700 hover:bg-yellow-700 transition duration-200 ease-in-out mt-5" 
                onClick={getRandomRecipe}
            >
                Pick a recipe!
            </button>

            {randomRecipe && (
                <div className="custom-border rounded p-2 mt-3">
                    <div className="p-3" style={{ background: '#EAA965'}}>
                        <h3 className="text-2xl">{randomRecipe.title}</h3>
                        <p className="mb-2"><b>Description:</b> {randomRecipe.description}</p>

                        <div className="flex flex-col items-center">
                            <h4 className="text-xl"><b><u>Ingredients</u></b></h4>
                            <ul className="columns-1 sm:columns-2 lg:columns-3 mb-2 space-y-1">
                                {randomRecipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="text-left">✦ {ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        <h4 className="text-xl text-left"><b><u>Instructions</u></b></h4>
                        <ol className="list-decimal list-inside marker:font-bold space-y-3 text-left">
                            {randomRecipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Randomizer;