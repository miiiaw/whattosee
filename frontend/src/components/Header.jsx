import { Link } from "react-router-dom"

export default function Header({ chosenPerson }) {
    return (
        <>
        <header>
            <nav>
                <span id="pageLogo">
                    What to see?
                </span>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/genresCollection">GenresCollection</Link>
                    </li>
                    <li>
                    <Link to="/">{chosenPerson}</Link>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}