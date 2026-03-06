export const extractToken = (value) => {
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

export const getRandomItems = (arr, n)=>{
    const copy = [...arr];
    for(let i = 0; i < copy.length; i++){
        const j = Math.floor(Math.random() * (i+1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0,n);
}
