function login() {
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
                <button type="submit">Login</button>

            </form>
            <a href="/register">Register</a>
        </div>
    )
}

export default login