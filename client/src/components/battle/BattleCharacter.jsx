import hacker from '../../assets/hacker.png';
import defender from '../../assets/cybersecurity_specialist.png';
import { useRef, useEffect } from 'react';

const roles = {
    attacker: hacker,
    defender: defender,
}

const BattleCharacter = ({username, rank, hp, role="attacker", className})=>{

    return(
        <div className={`absolute mb-12 flex flex-col justify-center items-center ${className}`}>
            <img src={roles[role]} alt="Player" className="w-full pixelart mirrored"/>
            <div className='w-full text-white font-jersey -translate-y-40 px-10'>
                <div className='flex items-end'>
                    <h2 className='text-2xl bg-neutral-900 w-fit px-5 shadow-[5px_5px_0px_rgb(0_0_0_/_0.7)] text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.7)]'>{username}</h2>
                    <h3 className='text-lg bg-amber-600 px-5 h-fit shadow-[5px_5px_0px_rgb(0_0_0_/_0.7)] text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.7)]'>{rank}</h3>
                </div>
                <div className='bg-neutral-950 w-full p-4 shadow-[5px_5px_0px_rgb(0_0_0_/_0.7)]'>
                    <div className='w-full bg-neutral-900 overflow-hidden relative'>
                        <div className={`bg-amber-300 h-9`} style={{width: hp/20*100 + "%"}}></div>
                        <div className="absolute h-full w-full top-0 uppercase text-nowrap z-11 text-3xl text-black pl-2">{role == "attacker" ? "persistance" : "integrity"} {hp}/20</div>
                        <div className="absolute h-full w-full bg-amber-600 top-0 z-10" style={hp>20 ? {width: (hp-20)/20*100 + "%"} : {width: "0px"}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BattleCharacter;