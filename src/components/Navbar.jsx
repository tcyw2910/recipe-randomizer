import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="text-white">
            <ul className="container flex space-x-10 mx-auto justify-center items-center bg-yellow-600 rounded-lg">
                <li><Link to="/" className="nav-link underline-animation">Home</Link></li>
                <li><Link to="/add-recipe" className="nav-link underline-animation">Add a recipe</Link></li>
                <li><Link to="/recipes" className="nav-link underline-animation">Recipe list</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;