import { useState } from "react";
import { getRandomItems } from "../../utils/utils";
import Ability from "../ability/Ability";
import { useEffect } from "react";

const DraftScreen = ({role, setStatus})=>{

    const [abilities, setAbilities] = useState([]);
    const [current, setCurrent] = useState([]);
    const [picked, setPicked] = useState([]);

    useEffect(()=>{
        (async()=>{
            try{
                const req = await fetch(`http://localhost:5000/api/abilities?role=${role}`, {
                    method: "GET",
                });

                if(!req.ok){
                    // 
                }
                const data = await req.json();
                setAbilities([...data]);
                setCurrent(getRandomItems(data, 2));
            } catch(e){
                //
            }
        })();
    }, []);

    const handlePicked = (ability)=>{
        setPicked([...picked, ability]);
        if(picked.length < 4){
            console.log(abilities);
            console.log(getRandomItems(abilities, 2));
            setCurrent(getRandomItems(abilities, 2));
        } else {
            setStatus("ready");
        }
    }

// on select: if user has less than 4 abilities, refresh
// else proceed to battle screen
    return(
        <div>
            {current.map((ability, index)=>
                <Ability key={index} data={ability} unlocked={true} onClick={()=>handlePicked(ability)}/>
            )}
        </div>
    )
}

export default DraftScreen;