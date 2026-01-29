import hacker from '../../assets/hacker.png';
import defender from '../../assets/cybersecurity_specialist.png';
import { useRef, useEffect } from 'react';

const roles = {
    attacker: hacker,
    defender: defender,
}

const Character = ({role="attacker", className})=>{

    return(
        <div className={`absolute mb-12 flex justify-center items-center ${className}`}>
            <img src={roles[role]} alt="Player" className="w-full pixelart mirrored"/>
        </div>
    )
}

export default Character;