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
                        <Link to="/home" className="seeLink">What shall I see?</Link>
                    </li>
                    <li>
                        <Link to="/genresCollection">Browse genres</Link>
                    </li>
                    <li>
                    <Link to="/">Logged in as: {chosenPerson}</Link>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}