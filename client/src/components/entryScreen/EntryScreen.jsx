import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Character from "../lobby/Character.jsx";

const EntryScreen = ({user, setUser})=>{
    const navigate = useNavigate();
    const [showSignup, setShowSignup] = useState(false);

    if (user?.id) navigate("/");

    const handleGuest = async ()=>{
        try{
            console.log('a');
            
            const req = await fetch("/api/account/guest", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            
            if(!req.ok){
                console.error("Login failed:", await req.text());
                return;
            }

            const userData = await req.json();
            setUser({
                id: userData?._id ?? userData?.id ?? null,
                username: userData?.username || (userData?._id ? `Guest ${userData._id}` : undefined),
                level: userData?.level ?? 0,
                levelPoints: userData?.levelPoints ?? 0,
            });

            navigate("/");
        } catch(e){
            console.error("Login error:", e);
        }
    }

    const handleSignup = ()=>{
        setShowSignup(!showSignup);
    }

    return(
        <div className="screen relative gradient-background flex justify-center items-center overflow-hidden">
            <h1 className='font-jersey text-white text-[150px] absolute top-[7%] text-shadow-[10px_10px_0px_rgb(0_0_0_/_0.6)]'>
                <span className='text-red-200'>FIRE</span><span className='text-sky-200'>WALL</span>
            </h1>
            <Character role="defender" className="w-[80%] absolute left-[-20%] top-[-20%] mirrored grayscale opacity-50 z-1 fade-left"/>
            {/* <Signup setUser={setUser}/>
            <br/> */}
            { showSignup ? <Signup setUser={setUser} handleSignup={handleSignup}/> : <Login setUser={setUser} handleGuest={handleGuest} handleSignup={handleSignup}/> }
            {/* <button onClick={handleGuest}>Continue as guest</button> */}
            <Character role="attacker" className="w-[80%] absolute right-[-20%] top-[-20%] grayscale opacity-50 z-1 fade-left"/>
        </div>
    )
}

export default EntryScreen;