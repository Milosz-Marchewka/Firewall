import Ability from "../../temp/Abilities.js"

export const getAbilities = async (req, res)=>{
    let abilities = [];
    if(req.query?.role){
        abilities = await Ability.find({role: req.query.role}).select("-__v -_id").sort((a,b)=>a.rarity-b.rarity);
    } else {
        const attacker = [...await Ability.find({role: "attacker"}).select("-__v -_id")].sort((a,b)=>a.rarity-b.rarity);
        const defender = [...await Ability.find({role: "defender"})].sort((a,b)=>a.rarity-b.rarity);
        abilities = {
            attacker: attacker,
            defender: defender
        }
    }
    abilities ? 
        res.status(200).json(abilities) :
        res.status(500).send("Internal server error");
}