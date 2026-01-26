import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const EntryScreen = ({setUser})=>{
    const navigate = useNavigate();

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

    return(
        <div>
            <Signup setUser={setUser}/>
            <br/>
            <Login setUser={setUser}/>
            <button onClick={handleGuest}>Continue as guest</button>
        </div>
    )
}

export default EntryScreen;