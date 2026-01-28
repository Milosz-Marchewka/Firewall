import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";
import Link from "./Link";

const Login = ({setUser, handleGuest, handleSignup})=>{
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
        <div className="flex flex-col items-center bg-gray-700 text-white rounded-2xl w-1/4 h-1/3 pb-4">
            <Header children="Log into your account" />
            <Input type="text" name="username"  placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} className=""/>
            <Input type="password" name="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className=""/>
            <Button onClick={handleLogin} children="Login"/>
            <div className="flex gap-8 mt-4 ">
                <Link onClick={handleSignup} children="Create an account"/>
                <Link onClick={handleGuest} children="Continue as Guest"/>
            </div>
        </div>
    )
}

export default Login;