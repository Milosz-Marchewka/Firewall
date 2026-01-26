import Game from "../../db/Game.js";
import { createURL, URL_BASE } from "../../utils.js";

export const quickPlay = async (req, res) => {
    try {
        const existing = await Game.findOne({
            status: 'waiting',
            $or: [
                { 'attacker.id': null },
                { 'defender.id': null }
            ]
        }).sort({ _id: 1 });

        if (existing) {
            return res.status(200).json({ roomUrl: existing.url, reused: true });
        }

        const roomUrl = createURL(`${URL_BASE}/room`);
        const room = new Game({
            url: roomUrl,
            defender: { id: null },
            attacker: { id: null }
        });

        await room.save();
        return res.status(200).json({ roomUrl, reused: false });
    } catch (e) {
        return res.status(500).send("test");
    }
};
