import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import eggIcon from "../assets/images/icons/egg.svg";
//@ts-ignore
import '../assets/style/easteregg.css';

const HINTS = [
    "Psst… tu m'as trouvé. Continue.",
    "Aïe ! Encore un coup et je craque…",
    "Indice : parfois, ne pas trouver… c'est déjà trouver.",
];

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Machine à écrire isolée : seul ce composant se re-rend pendant l'animation. */
function Typewriter({ text }: { text: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(0);
        const id = window.setInterval(() => {
            setCount((v) => {
                if (v >= text.length) {
                    window.clearInterval(id);
                    return v;
                }
                return v + 1;
            });
        }, 32);
        return () => window.clearInterval(id);
    }, [text]);
    return (
        <span>
            {text.slice(0, count)}
            <span className="egg-caret" aria-hidden="true">▌</span>
        </span>
    );
}

export default function EasterEgg() {
    const [cracks, setCracks] = useState(0);
    const [isBubbleOpen, setIsBubbleOpen] = useState(false);
    const [hitCount, setHitCount] = useState(0);
    const hideTimer = useRef<number | undefined>(undefined);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        setCracks((c) => Math.min(c + 1, HINTS.length));
        setHitCount((h) => h + 1);
        setIsBubbleOpen(true);
        window.clearTimeout(hideTimer.current);
        hideTimer.current = window.setTimeout(() => setIsBubbleOpen(false), 8000);
    }, []);

    useEffect(() => () => window.clearTimeout(hideTimer.current), []);

    // Raccourci secret : le code Konami mène directement à la découverte.
    useEffect(() => {
        let step = 0;
        const onKey = (e: KeyboardEvent) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            if (key === KONAMI[step]) step++;
            else step = key === KONAMI[0] ? 1 : 0;
            if (step === KONAMI.length) {
                step = 0;
                navigate('/oeuf-introuvable');
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [navigate]);

    return (
        <div className={`easter-egg-wrap${isBubbleOpen ? ' open' : ''}`}>
            {isBubbleOpen && cracks > 0 && (
                <div className="egg-bubble" role="status" aria-live="polite">
                    <Typewriter text={HINTS[cracks - 1]} />
                </div>
            )}
            <button
                type="button"
                key={hitCount}
                className={`easter-egg crack-${cracks}${hitCount > 0 ? ' hit' : ''}`}
                onClick={handleClick}
                aria-label="Un œuf mystérieux"
            >
                <img src={eggIcon} alt="" width={40} height={48} />
                <svg className="egg-crack" viewBox="0 0 40 48" aria-hidden="true">
                    <path d="M6 24 l6 -4 l5 5 l6 -6 l5 5 l6 -4" />
                </svg>
            </button>
        </div>
    );
}
