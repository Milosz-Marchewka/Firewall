import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "./Link";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";

const Signup = ({setUser, handleSwitch, handleGuest})=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState('');
    const [xp, setXp] = useState(0);
    const [error, setError] = useState("");
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
                let errorMessage = await req.text();
                console.error("Signup failed:", errorMessage);
                setError(errorMessage);
                return;
            }

            const userData = await req.json();
            setUser(userData);
            navigate("/");
        } catch(e){
            console.error("Signup error:", e);
        }
    }

    return(
        <div className="flex flex-col items-center bg-zinc-700 text-white border-zinc-900 border-10 shadow-[10px_10px_0px_rgb(0_0_0_/_0.4)] w-1/3 h-fit  pb-4 z-2 relative">
            <Header children="Create a new account" />
            <Input type="text" name="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e)=>e.code==="Enter" ? handle() : ""}/>
            <Button onClick={handle} children="Sign up" className="mt-8 bg-yellow-500 hover:bg-yellow-400"/>
            <div className="w-full flex justify-center gap-8 mt-4 font-jersey text-xl">
                <Link onClick={()=>handleSwitch("login")} className={"hover:underline"} children="Go to login"/>
                <Link onClick={handleGuest} className={"hover:underline"} children="Continue as Guest"/>
            </div>
            {
                error != "" ?
                <div className=" bg-red-700 font-jersey absolute w-fit h-fit -bottom-15 border-2 border-red-950 text-center px-1">
                    <p className="text-2xl text-red-100 text-center">{error}</p>
                </div>
                :
                ""
            }
        </div>
    )
}

export default Signup;