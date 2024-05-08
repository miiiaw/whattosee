import { Link } from "react-router-dom"

export default function Header() {
    return (
        <>
        <header>
            <nav>
                <span id="pageLogo">
                    What to see?
                </span>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/genresCollection">GenresCollection</Link>
                    </li>
                    <li>
                        Name
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}