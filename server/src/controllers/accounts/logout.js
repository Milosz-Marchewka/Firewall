const logout = async (req, res)=>{
    try{
        res.clearCookie('auth', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/api/account',
        });
        res.status(200).send({ ok: true });
    } catch (error) {
        res.status(500).send({ ok: false, error: 'logout_failed' });
    }
}

export default logout;