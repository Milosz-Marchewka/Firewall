import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ()=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async()=>{
        try{
            const req = await fetch("/api/account/signup", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, email, password}),
                credentials: 'include'
            });

            if(!req.ok){
                console.error("Signup failed:", await req.text());
            }

            navigate("/");
        } catch(e){
            console.error("Signup error:", e);
        }
    }

    return(
        <div>
            <input type="text" name="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    )
}

export default Signup;