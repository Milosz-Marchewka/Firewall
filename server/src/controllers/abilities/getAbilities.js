import Ability from "../../db/Abilities.js"

export const getAbilities = async (req, res)=>{
    try{
        let abilities;
        const requestedRole = typeof req.query?.role === 'string' ? req.query.role.toLowerCase() : null;
        if(requestedRole){
            if (requestedRole !== 'attacker' && requestedRole !== 'defender') {
                return res.status(400).json({ error: 'invalid_role' });
            }

            abilities = await Ability.find({ role: requestedRole })
                .select("-__v")
                .sort({ rarity: 1 }); // ASC
        } else {
            const attacker = await Ability.find({ role: "attacker" })
            .select("-__v")
            .sort({ rarity: 1 });

            const defender = await Ability.find({ role: "defender" })
                .select("-__v")
                .sort({ rarity: 1 });

            abilities = {
                attacker,
                defender
            }
        }
        return res.status(200).json(abilities);
    } catch(e){
        return res.status(500).send("Internal server error");
    }
}