const cookiePaths = ['/', '/api', '/api/account', '/api/account/'];

const clearAuthCookies = (req, res) => {
    const names = Object.keys(req.cookies || {});

    names.forEach((name) => {
        cookiePaths.forEach((path) => {
            res.clearCookie(name, {
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                path,
            });
        });
    });
};

export default clearAuthCookies;
