import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../socket.js';

const extractToken = (value) => {
    if (typeof value !== 'string' || value.trim().length === 0) return null;
    const trimmed = value.trim();

    try {
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            const parsed = new URL(trimmed);
            const parts = parsed.pathname.split('/').filter(Boolean);
            return parts.at(-1) ?? null;
        }
    } catch {
        // fall through
    }

    return trimmed;
};

const QuickPlayJoin = () => {
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleQuickPlay = async () => {
        if (isJoining) return;
        setIsJoining(true);
        setError(null);

        console.log('a');
        
        try {
            // create room
            const response = await fetch(`${API_BASE}/api/quickplay`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('b');
            

            if (!response.ok) {
                throw new Error('Failed to create room');
            }

            console.log('c');
            

            const data = await response.json();
            const roomUrl = data?.roomUrl;
            if (!roomUrl) {
                throw new Error('Server did not return roomUrl');
            }

            console.log('d');
            

            const token = extractToken(roomUrl);
            if (!token) {
                throw new Error('Invalid roomUrl');
            }

            // Navigate within the SPA. The /room/:token route will do the socket join.
            console.log('Navigating to room:', token, `/room/${token}`);
            navigate(`/room/${token}`);
            setIsJoining(false);
        } catch (err) {
            console.log(err?.message ?? 'quickplay_failed');
            
            setError(err?.message ?? 'quickplay_failed');
            setIsJoining(false);
        }
    };

    return (
        <div>
            <button onClick={handleQuickPlay} disabled={isJoining}>
                {isJoining ? 'Joining…' : 'Quick Play'}
            </button>
            {error ? <div>{String(error)}</div> : null}
        </div>
    );
};

export default QuickPlayJoin;