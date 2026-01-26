import Ability from "../../temp/Abilities.js"

export const getAbilities = async (req, res)=>{
    let abilities = [];
    if(req.query?.role){
        abilities = await Ability.find({role: req.query.role}).sort((a,b)=>a.rarity-b.rarity);
    } else {
        abilities = {
            attacker: [...await Ability.find({role: "attacker"})].sort((a,b)=>a.rarity-b.rarity),
            defender: [...await Ability.find({role: "defender"})].sort((a,b)=>a.rarity-b.rarity)
        }
    }
    abilities ? 
        res.status(200).json(abilities) :
        res.status(500).send("Internal server error");
}