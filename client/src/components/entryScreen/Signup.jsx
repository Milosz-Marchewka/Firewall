import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ()=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState('');
    const [xp, setXp] = useState(0);
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

    const handleTest = async ()=>{
        try{
            const req = await fetch("/api/account/level", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({uid, xp})
            });

            if(!req.ok){
                console.log(await req.text());
            }
        } catch(e){
            console.log(e);
        }
    }

    return(
        <div>
            <input type="text" name="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
            <input type="text" name="uid" id="" value={uid} onChange={(e) => setUid(e.target.value)}/>
            <input type="number" name="xp" id="" value={xp} onChange={(e) => setXp(e.target.value)}/>
            <button onClick={handleTest}>test</button>
        </div>
    )
}

export default Signup;