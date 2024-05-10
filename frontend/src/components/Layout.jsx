import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout({ chosenPerson }) {
    return (
        <>
        <div id="container">
            <Header chosenPerson={chosenPerson} />
            <main>
                <Outlet />
            </main>
        </div>
        </>
    )
}