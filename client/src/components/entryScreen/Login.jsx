import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setUser})=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        try{
            const req = await fetch("/api/account/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });

            if(!req.ok){
                console.error("Login failed:", await req.text());
                return;
            }

            const userData = await req.json();
            setUser(userData);
            navigate("/");
        } catch(e){
            console.error("Login error:", e);
        }
    }

    return(
        <div>
            <input type="text" name="username"  placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" name="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;