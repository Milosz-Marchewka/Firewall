import User from "../../db/User.js";
import Guest from "../../db/Guest.js";

const rankBrackets = {
    0: "Noob",
    5: "Beginner",
    10: "Adept",
    20: "Intermediate",
    35: "Advanced",
    50: "Expert"
}

const getRank = async (id)=>{
    if (!id) return null;
    try{
        const user = await User.findById(id).select('username level');
        const guest = await Guest.findById(id).select('level');
        
        if(user){
            return determineRank(user.level);
        }
        if(guest){
            return determineRank(guest.level);
        }
        return null;
    } catch(e){
        return null;
    }
}

export const determineRank = (level)=>{
    for(const floor of Object.keys(rankBrackets).reverse()){
        if(level >= Number(floor)) return rankBrackets[Number(floor)];
    }
}

export default getRank;