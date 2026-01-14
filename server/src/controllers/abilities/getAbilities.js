import Ability from "../../temp/Abilities.js"

export const getAbilities = async (req, res)=>{
    const abilities = await Ability.find({role: req.query.role || undefined})
    abilities ? 
        res.status(200).json(abilities) :
        res.status(500).send("Internal server error");
}