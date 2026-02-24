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
    const [error, setError] = useState("");

    const handleLogin = async ()=>{
        try{
            const req = await fetch("/api/account/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });

            if(!req.ok){
                let errorMessage = await req.text();
                console.error("Login failed:", errorMessage);
                setError(errorMessage);
                return;
            }

            const userData = await req.json();
            setUser(userData);
            navigate("/");
        } catch(e){
            console.log(e);
        }
    }

    return(
        <div className="flex flex-col items-center bg-zinc-700 text-white border-zinc-900 border-10 shadow-[10px_10px_0px_rgb(0_0_0_/_0.4)] w-1/3 h-fit pb-4 z-2 relative">
            <Header children="Log into your account" />
            <Input type="text" name="username"  placeholder='Username' value={username} onChange={e => {setUsername(e.target.value); setError("")}} className=""/>
            <Input type="password" name="password" placeholder='Password' value={password} onChange={e => {setPassword(e.target.value); setError("")}} className="" onKeyDown={(e)=>e.code==="Enter" ? handleLogin() : ""}/>
            <Button onClick={handleLogin} children="Login" className="mt-8 bg-yellow-500 hover:bg-yellow-400"/>
            <div className="flex gap-8 mt-4 font-jersey text-xl">
                <Link onClick={handleSignup} className={"hover:underline"} children="Create an account"/>
                <Link onClick={handleGuest} className={"hover:underline"} children="Continue as Guest"/>
            </div>
            {
                error != "" ?
                <div className=" bg-red-700 font-jersey absolute w-1/3 h-fit -bottom-15 border-2 border-red-950 text-center">
                    <p className="text-2xl text-red-100 text-center">{error}</p>
                </div>
                :
                ""
            }
        </div>
    )
}

export default Login;