import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-recipe">Add a recipe</Link></li>
                <li><Link to="/recipes">Recipe list</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;