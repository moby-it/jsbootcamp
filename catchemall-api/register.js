function register() {
    return (
        <div>
            <form action="/login" method="POST">
                <div>
                    <label for="name">Email</label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label for="name">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Register</button>

            </form>
            <a href="/login">Login</a>
        </div>
    )
}

export default register