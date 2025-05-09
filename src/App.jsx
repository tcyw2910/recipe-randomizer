import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeForm from './pages/RecipeForm';
import RecipeList from "./pages/RecipeList";
import Randomizer from "./pages/Randomizer";
import './App.css'
import { useEffect, useState } from "react"; // Add useState to manage recipes


function App() {
  const [recipes, setRecipes] = useState([]); // State for storing recipes

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/recipes");
        const data = await response.json();
        console.log("Fetch recipes:", data);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []); // Runs only on mount

  // Function to delete a recipe
  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe!");
      } 

      const data = await response.json();  // Get the response body from the server
      alert(data.message);

      // Update the state to remove the deleted recipe
      setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Function to update a recipe
  const updateRecipe = async (updatedRecipe) => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${updatedRecipe.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      const data = await response.json();

      // Update local state
      setRecipes (prev => 
        prev.map(recipe => recipe.id === data.id ? data : recipe)
      );
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-green-200 sm:px-6 lg:px-8">
        <div 
          className="w-full custom-border max-w-[110rem] mx-auto">
          <div className="p-8" style={{ background: 'linear-gradient(to top, #58CEEF, #096BCC)'}}>
            <div className="text-center mt-10">
              <h1 className="text-4xl font-bold mb-1" style={{ color: '#FA910C'}}>Recipe Randomizer</h1>
            </div>
        
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Randomizer recipes={recipes} />}></Route>
              <Route path="/add-recipe" element={<RecipeForm addRecipe={setRecipes} />}></Route>
              <Route path="/recipes" element={<RecipeList recipes={recipes} deleteRecipe={deleteRecipe} updateRecipe={updateRecipe} />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
