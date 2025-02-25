import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeForm from './pages/RecipeForm';
import RecipeList from "./pages/RecipeList";
import Randomizer from "./pages/Randomizer";
import './App.css'
import { useState } from "react"; // Add useState to manage recipes


function App() {
  const [recipes, setRecipes] = useState([]); // State for storing recipes

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

export default App
