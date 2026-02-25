import Ability from "../../db/Abilities.js";
import User from "../../db/User.js";
import Guest from "../../db/Guest.js";

const buyAbility = async (req, res)=>{
    console.log(req.body?.id, req.body?.code);
    
    if(!req.body.id || !req.body.code){
        return res.status(400).send("Bad request");
    }

    try{
        const user = await User.findOne({_id: req.body.id});
        let guest = null;
        if(!user){
            guest = await Guest.findOne({_id: req.body.id});
            if(!guest){
                console.log('user');
                
                return res.status(404).send("User not found");
            } 
        }

        const ability = await Ability.findOne({code: req.body.code});
        if(!ability){
            console.log('ability');
            
            return res.status(404).send("Ability not found");
        }
        // debug: log ability code and current owned codes
        try{
            const userCodes = user ? (Array.isArray(user.abilities) ? user.abilities.map(a => a.code) : []) : [];
            const guestCodes = guest ? (Array.isArray(guest.abilities) ? guest.abilities.map(a => a.code) : []) : [];
            console.log('[buyAbility] requested code:', req.body.code, 'found ability.code:', ability.code);
            console.log('[buyAbility] userCodes:', userCodes, 'guestCodes:', guestCodes);
        }catch(e){
            console.log('[buyAbility] logging error', e);
        }
        if(user?.abilities.includes(ability.code) || guest?.abilities.includes(ability.code)){
            console.log('owned');
            
            return res.status(400).send("Ability already owned");
        }

        if(user){
            if(user.points < ability.cost){
                console.log('points');
                
                return res.status(400).send("Not enough points");
            }

            user.points -= ability.cost;
            user.abilities.push(ability);
            await user.save();
            return res.status(200).json({ability, points: Number(user.points)});
        }
        
        if(guest){
            console.log(guest.points, ability.cost);
            
            if(guest.points < ability.cost){
                console.log('points');
                
                return res.status(400).send("Not enough points");
            }

            guest.points -= ability.cost;
            guest.abilities.push(ability);
            await guest.save();
            return res.status(200).json({ability, points: Number(guest.points)});
        }
    }catch(err){
        console.log(err);
        
        return res.status(500).send("Internal server error");
    }
}

export default buyAbility;