import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
    const [active, setActive] = useState('user');
    const navigate = useNavigate();

    const src = useMemo(() => {
        // return '/404.html';
        return active === 'tech' ? '/technical-docs.html' : '/user-docs.html';
    }, [active]);

    return (
        <div className="screen bg-neutral-900 text-white flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black/80 bg-neutral-800">
                <div className="flex items-center gap-4">
                    <button
                        className="font-jersey text-3xl px-4 py-2 bg-neutral-700 border-4 border-black/80 hover:bg-neutral-600"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                    <h1 className="font-jersey text-4xl">Documentation</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        className={`font-jersey text-3xl px-4 py-2 border-4 border-black/80 ${active === 'user' ? 'bg-amber-500' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                        onClick={() => setActive('user')}
                    >
                        User Guide
                    </button>
                    <button
                        className={`font-jersey text-3xl px-4 py-2 border-4 border-black/80 ${active === 'tech' ? 'bg-amber-500' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                        onClick={() => setActive('tech')}
                    >
                        Technical Docs
                    </button>
                </div>
            </div>
            <div className="flex-1">
                <iframe
                    title="Documentation"
                    src="/404.html"
                    className="w-full h-full border-0"
                />
            </div>
        </div>
    );
};

export default Documentation;
