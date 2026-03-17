import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
    const [active, setActive] = useState('user');
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();

    const src = useMemo(() => {
        const prefix = lang === 'pl' ? '/pl-' : '/';
        return active === 'tech' ? `${prefix}technical-docs.html` : `${prefix}user-docs.html`;
    }, [active, lang]);

    const labels = useMemo(() => {
        if (lang === 'pl') {
            return {
                title: 'Dokumentacja',
                user: 'Poradnik',
                tech: 'Techniczna',
                back: 'Wróć',
                en: 'EN',
                pl: 'PL',
            };
        }

        return {
            title: 'Documentation',
            user: 'User Guide',
            tech: 'Technical Docs',
            back: 'Back',
            en: 'EN',
            pl: 'PL',
        };
    }, [lang]);

    return (
        <div className="screen bg-neutral-900 text-white flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black/80 bg-neutral-800">
                <div className="flex items-center gap-4">
                    <button
                        className="font-jersey text-3xl px-4 py-2 bg-neutral-700 border-4 border-black/80 hover:bg-neutral-600"
                        onClick={() => navigate('/')}
                    >
                        {labels.back}
                    </button>
                    <h1 className="font-jersey text-4xl">{labels.title}</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        className={`font-jersey text-3xl px-4 py-2 border-4 border-black/80 ${active === 'user' ? 'bg-amber-500' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                        onClick={() => setActive('user')}
                    >
                        {labels.user}
                    </button>
                    <button
                        className={`font-jersey text-3xl px-4 py-2 border-4 border-black/80 ${active === 'tech' ? 'bg-amber-500' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                        onClick={() => setActive('tech')}
                    >
                        {labels.tech}
                    </button>
                    <button
                        className={`font-jersey text-3xl px-4 py-2 border-4 border-black/80 ${lang === 'en' ? 'bg-amber-500' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                        onClick={() => setLang('en')}
                    >
                        {labels.en}
                    </button>
                    <button
                        className={`font-jersey text-3xl px-4 py-2 border-4 border-black/80 ${lang === 'pl' ? 'bg-amber-500' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                        onClick={() => setLang('pl')}
                    >
                        {labels.pl}
                    </button>
                </div>
            </div>
            <div className="flex-1">
                <iframe
                    title="Documentation"
                    src={src}
                    className="w-full h-full border-0"
                />
            </div>
        </div>
    );
};

export default Documentation;
