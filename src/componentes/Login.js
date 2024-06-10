import React from "react";

const Login = () => {
    const googleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div className="login">
            <h1>Log in</h1>
            <button onClick={googleLogin}>Log in with Google</button>
        </div>
    );
}

export default Login;