import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Character from "../lobby/Character.jsx";

const EntryScreen = ({setUser})=>{
    const navigate = useNavigate();
    const [showSignup, setShowSignup] = useState(false);

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
            }
            
            navigate("/");
        } catch(e){
            console.error("Login error:", e);
        }
    }

    const handleSignup = ()=>{
        setShowSignup(!showSignup);
    }

    return(
        <div className="screen relative bg-gradient-to-r from-sky-700 to-red-700 flex justify-center items-center">
            <Character role="defender" className="h-30 w-[25%] absolute left-0 top-[40%] mirrored"/>
            {/* <Signup setUser={setUser}/>
            <br/> */}
            { showSignup ? <Signup setUser={setUser} handleSignup={handleSignup}/> : <Login setUser={setUser} handleGuest={handleGuest} handleSignup={handleSignup}/> }
            {/* <button onClick={handleGuest}>Continue as guest</button> */}
            <Character role="attacker" className="h-30 w-[25%] absolute right-0 top-[40%]"/>
        </div>
    )
}

export default EntryScreen;