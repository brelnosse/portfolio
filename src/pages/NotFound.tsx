//@ts-ignore
import '../assets/style/notfound.css';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGamepad, faTimes, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import Confetti from '../components/Confetti';
import eggIcon from '../assets/images/icons/egg.svg';
import HallOfFame from '../components/HallOfFame';

const GAME_URL = process.env.REACT_APP_GAME_URL || 'https://sevux.netlify.app/';

/**
 * Étapes de la révélation :
 * 0 « 404 » tombe · 1 sous-titre · 2 le 0 devient un œuf qui se fissure
 * 3 éclosion (flash, confettis, tampon) · 4 carte de découverte
 */
const TIMELINE = [900, 1900, 3100, 3900];

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const reducedMotion = useMemo(
        () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
        []
    );
    const [stage, setStage] = useState<number>(reducedMotion ? 4 : 0);
    const [isGameOpen, setIsGameOpen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // On arrive souvent ici depuis le bas de l'accueil : on remonte instantanément
    // (sans le défilement fluide global) pour ne pas rater l'animation.
    useLayoutEffect(() => {
        const root = document.documentElement;
        const previous = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        root.style.scrollBehavior = previous;
    }, []);

    useEffect(() => {
        if (reducedMotion) return;
        const timers = TIMELINE.map((ms, i) => window.setTimeout(() => setStage((s) => Math.max(s, i + 1)), ms));
        return () => timers.forEach(window.clearTimeout);
    }, [reducedMotion]);

    useEffect(() => {
        document.title = stage >= 3 ? '🥚 Easter egg trouvé !' : '404 | Brel NOSSE';
        return () => { document.title = 'Portfolio | Brel NOSSE'; };
    }, [stage]);

    const skip = useCallback(() => setStage((s) => (s < 3 ? 3 : s)), []);

    useEffect(() => {
        if (!isGameOpen) return;
        document.body.classList.add('no-scroll');
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsGameOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.classList.remove('no-scroll');
            window.removeEventListener('keydown', onKey);
        };
    }, [isGameOpen]);

    return (
        <main className={`nf ${[1, 2, 3, 4].filter((n) => stage >= n).map((n) => `s${n}`).join(' ')}`} onClick={stage < 3 ? skip : undefined}>
            {stage >= 3 && !reducedMotion && <Confetti originY={0.32} />}
            <div className="nf-flash" aria-hidden="true" />

            <div className="nf-stage">
                <h1 className="nf-digits" aria-label="404">
                    <span className="nf-digit d1">4</span>
                    <span className="nf-digit nf-zero d2">
                        <span className="nf-o">0</span>
                        <span className="nf-egg" aria-hidden="true">
                            <span className="nf-egg-half top"><img src={eggIcon} alt="" /></span>
                            <span className="nf-egg-half bottom"><img src={eggIcon} alt="" /></span>
                            <span className="nf-prize"><FontAwesomeIcon icon={faGamepad} /></span>
                        </span>
                    </span>
                    <span className="nf-digit d3">4</span>
                </h1>

                <p className="nf-subtitle">
                    Page introuvable<span className="nf-ou-pas">… ou pas ?</span>
                </p>

                <div className="nf-stamp" aria-hidden={stage < 3}>
                    Easter egg trouvé !
                </div>

                {stage < 3 && <span className="nf-skip">Cliquer pour passer</span>}
            </div>

            <section className="nf-card" aria-hidden={stage < 4}>
                <span className="nf-card-tag">Succès débloqué · 1/1</span>
                <h2>Tu as déniché le jeu caché&nbsp;!</h2>
                <p>
                    <b>SEVUX</b> est un mini shooter que j'ai créé en JavaScript vanilla, puis enrichi :
                    canvas 2D, sprites dessinés par le code et sons synthétisés.
                    Défends la zone, enchaîne les combos et abats le boss final.
                </p>
                <div className="nf-actions">
                    <Button type="default" valueIcon={faGamepad} valueText="Jouer ici" onClick={() => setIsGameOpen(true)} />
                    <Button type="light" valueIcon={faUpRightFromSquare} valueText="Nouvel onglet" onClick={() => window.open(GAME_URL, '_blank', 'noopener')} />
                    <Button type="light" valueIcon={faArrowLeft} valueText="Retour au portfolio" onClick={() => navigate('/')} />
                </div>
                <div className="nf-hof">
                    <h3>Hall of fame</h3>
                    <HallOfFame limit={10} emptyText="Aucun score pour l'instant : la première place est à prendre !" />
                </div>
                <p className="nf-tip">Astuce : depuis l'accueil, le code <kbd>↑</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd><kbd>←</kbd><kbd>→</kbd><kbd>B</kbd><kbd>A</kbd> mène aussi ici.</p>
            </section>

            {isGameOpen && (
                <div className="nf-game" role="dialog" aria-modal="true" aria-label="Jeu SEVUX">
                    <div className="nf-game-window">
                        <div className="nf-game-bar">
                            <span>sevux.exe</span>
                            <button type="button" onClick={() => setIsGameOpen(false)} aria-label="Fermer le jeu">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <iframe
                            ref={iframeRef}
                            src={GAME_URL}
                            title="SEVUX"
                            allow="autoplay; fullscreen"
                            onLoad={() => iframeRef.current?.focus()}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default NotFound;
