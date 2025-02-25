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
        <div>
            <h2>Recipe Randomizer</h2>
            <button onClick={getRandomRecipe}>Pick a recipe!</button>

            {randomRecipe && (
                <div>
                    <h3>{randomRecipe.title}</h3>
                    <p>Description: {randomRecipe.description}</p>
                </div>
            )}
        </div>
    );
}

export default Randomizer;