import { Link } from "react-router-dom"

export default function LogIn({ users, setPerson }) {

    // Creating a function for setting the name/user choice and storing it in LocalStorage.
    const handleNameChoice = (name) => {
        setPerson(name)
        localStorage.setItem('name', name)
    }


    return (
        <>
        <div id="loginPage">
        <h1>Welcome! Please choose a person:</h1>
        <section id="login_users">
            <h2>Who is watching?</h2>
            {users?.map((user, index) =>
                <Link to="/home" key={index}>
                    <button onClick={() => handleNameChoice(user.name)}>
                        {user.name}
                    </button>
                </Link>
        )}
        </section>
        </div>
        </>
    )
}