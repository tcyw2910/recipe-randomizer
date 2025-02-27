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

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Randomizer recipes={recipes} />}></Route>
        <Route path="/add-recipe" element={<RecipeForm addRecipe={setRecipes} />}></Route>
        <Route path="/recipes" element={<RecipeList recipes={recipes} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
