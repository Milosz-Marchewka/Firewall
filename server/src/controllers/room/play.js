import Game from "../../db/Game.js";
import { createURL, URL_BASE } from "../../utils.js";

const roles = ['attacker', 'defender'];

export const play = async (req, res) => {
    try {
        if(req.body?.play && req.body.play?.abilities?.filter(a => a != null)?.length < 4){
            return res.status(400).send("Please select all 4 abilities.");
        }
        const selectedRole = req.body?.play?.character.toLowerCase() ?? null;
        const existingQuery = {
            status: 'waiting',
            type: req.body.type,
            $or: [
                { 'attacker.id': null },
                { 'defender.id': null }
            ]
        };

        if (selectedRole && roles.includes(selectedRole)) {
            existingQuery.$or = [{ [`${selectedRole}.id`]: null }];
        }

        const existing = await Game.findOne(existingQuery).sort({ _id: 1 });

        if (existing) {
            if (req.body?.play && selectedRole && roles.includes(selectedRole)) {
                await Game.findOneAndUpdate(
                    { _id: existing._id, [`${selectedRole}.id`]: null },
                    {
                        $set: {
                            [`${selectedRole}.id`]: req.body.play.id,
                            [`${selectedRole}.abilities`]: req.body.play.abilities,
                        },
                    }
                );
            }
            return res.status(200).json({ roomUrl: existing.url, reused: true });
        }

        const roomUrl = createURL(`${URL_BASE}/room`);
        let room;
        if(!req.body?.play){
            room = new Game({
                url: roomUrl,
                type: req.body.type,
                defender: { id: null },
                attacker: { id: null }
        });
        } else {
            room = new Game({
                url: roomUrl,
                type: req.body.type,
                [req.body.play?.character]: {
                    id: req.body.play?.id,
                    abilities: req.body.play?.abilities
                },
                [roles.find(r => r !== req.body.play?.character)]:{ id: null }
            });
        }

        await room.save();
        return res.status(200).json({ roomUrl, reused: false });
    } catch (e) {
        return res.status(500).send("play_failed");
    }
};
