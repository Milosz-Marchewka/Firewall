import Ability from "../../temp/Abilities.js"

export const getAbilities = async (req, res)=>{
    let abilities = [];
    if(req.query?.role){
        abilities = await Ability.find({role: req.query.role});
    } else {
        abilities = [await Ability.find({role: "attacker"}), await Ability.find({role: "defender"})];
    }
    abilities ? 
        res.status(200).json(abilities.sort((a,b)=>a.rarity-b.rarity)) :
        res.status(500).send("Internal server error");
}