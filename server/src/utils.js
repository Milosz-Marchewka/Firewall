import crypto from 'node:crypto';

const URL_LENGTH = 10;
// Frontend base URL used to build linkable room URLs.
// Example: http://localhost:5173
export const URL_BASE = process.env.URL_BASE ?? 'http://localhost:5173';
export const ROLES = ['attacker', 'defender'];

export const createURL = (base) => {
    if (typeof base !== 'string') {
        throw new Error('Base domain must be a string URL starting with http or https.');
    }

    let baseUrl;
    try {
        baseUrl = new URL(base);
    } catch {
        throw new Error('Base domain must be a valid URL starting with http or https.');
    }

    if (baseUrl.protocol !== 'http:' && baseUrl.protocol !== 'https:') {
        throw new Error('Base domain must be a valid URL starting with http or https.');
    }

    const randomPath = crypto.randomBytes(Math.ceil(URL_LENGTH / 2))
        .toString('hex')
        .slice(0, URL_LENGTH);

    const basePath = baseUrl.pathname.endsWith('/') ? baseUrl.pathname : `${baseUrl.pathname}/`;
    baseUrl.pathname = `${basePath}${randomPath}`;

    return baseUrl.toString();
};

export const extractRoomToken = (value) => {
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

export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const validatePassword = (password) => {
    // >8, one letter, one number, one special
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}