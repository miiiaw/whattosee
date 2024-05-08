import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
        <div id="container">
            <Header />
            <main>
                {children}
            </main>
        </div>
        </>
    )
}