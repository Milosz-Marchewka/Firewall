import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "./Link";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";

const Signup = ({setUser, handleSignup})=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState('');
    const [xp, setXp] = useState(0);
    const navigate = useNavigate();

    const handle = async()=>{
        try{
            const req = await fetch("/api/account/signup", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, email, password}),
                credentials: 'include'
            });

            if(!req.ok){
                console.error("Signup failed:", await req.text());
                return;
            }

            const userData = await req.json();
            setUser(userData);
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
        <div className="flex flex-col items-center bg-gray-700 text-white rounded-2xl w-1/4 h-1/3">
            <Header children="Create a new account" />
            <Input type="text" name="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleSignup} children="Sign up"/>
            <Link onClick={handleSignup} children="Already have an account? Log in"/>
        </div>
    )
}

export default Signup;