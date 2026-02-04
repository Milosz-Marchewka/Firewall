import User from "../../db/User.js";
import Guest from "../../db/Guest.js";

const getUsername = async (id)=>{
    try{
        const user = await User.findById(id).select('username');
        const guest = await Guest.findById(id).select('_id');
        
        if(user){
            return user.username;
        }
        if(guest){
            return `Guest ${guest._id}`;
        }
    } catch(e){
        return e.message;
    }
}

export default getUsername;