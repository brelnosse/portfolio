import { useCallback, useEffect, useState } from "react";
//@ts-ignore
import '../assets/style/halloffame.css';

export const SCORES_API = process.env.REACT_APP_SCORES_API || 'https://sevux.netlify.app/api/scores';

type Entry = {
    name: string;
    score: number;
    level: 'easy' | 'medium' | 'hard';
    won: boolean;
    accuracy: number;
    date: string;
};

const LEVELS: Record<Entry['level'], string> = { easy: 'Facile', medium: 'Normal', hard: 'Difficile' };

type HallOfFameProps = {
    limit?: number;
    /** texte affiché quand personne n'a encore de score */
    emptyText?: string;
};

/** Classement des joueurs de SEVUX, lu depuis l'API du jeu. Se rafraîchit quand le jeu intégré envoie un score. */
const HallOfFame: React.FC<HallOfFameProps> = ({ limit = 5, emptyText = "Personne n'a encore trouvé le jeu caché. Seras-tu le premier ?" }) => {
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [failed, setFailed] = useState(false);

    const load = useCallback(async (signal?: AbortSignal) => {
        try {
            const res = await fetch(`${SCORES_API}?limit=${limit}`, { signal, headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(String(res.status));
            const data = await res.json();
            // Données externes : on ne garde que des champs typés (React échappe déjà le texte affiché).
            const safe: Entry[] = (Array.isArray(data.entries) ? data.entries : [])
                .filter((e: any) => e && typeof e.name === 'string')
                .map((e: any) => ({
                    name: e.name.slice(0, 16),
                    score: Number(e.score) || 0,
                    level: Object.prototype.hasOwnProperty.call(LEVELS, e.level) ? e.level : 'medium',
                    won: e.won === true,
                    accuracy: Number(e.accuracy) || 0,
                    date: String(e.date ?? ''),
                }));
            setEntries(safe);
            setFailed(false);
        } catch (e) {
            if ((e as Error).name !== 'AbortError') setFailed(true);
        }
    }, [limit]);

    useEffect(() => {
        const controller = new AbortController();
        load(controller.signal);
        const apiOrigin = new URL(SCORES_API).origin;
        const onMessage = (event: MessageEvent) => {
            if (event.origin === apiOrigin && event.data?.type === 'sevux:score') load();
        };
        window.addEventListener('message', onMessage);
        return () => {
            controller.abort();
            window.removeEventListener('message', onMessage);
        };
    }, [load]);

    if (entries === null && !failed) {
        return (
            <ol className="hof hof-loading" aria-busy="true" aria-label="Chargement du classement">
                {Array.from({ length: Math.min(limit, 3) }, (_, i) => <li key={i}><span className="hof-skeleton" /></li>)}
            </ol>
        );
    }

    if (failed || !entries || entries.length === 0) {
        return <p className="hof-empty">{emptyText}</p>;
    }

    return (
        <ol className="hof">
            {entries.map((e, i) => (
                <li key={`${e.name}-${e.date}`} className={i < 3 ? `top-${i + 1}` : ''}>
                    <span className="hof-rank">{i + 1}</span>
                    <span className="hof-name">
                        {e.name}
                        {e.won && <span className="hof-crown" title="Boss vaincu" aria-label="boss vaincu"> 👑</span>}
                    </span>
                    <span className="hof-level">{LEVELS[e.level] ?? ''}</span>
                    <span className="hof-score">{e.score.toLocaleString('fr-FR')}</span>
                </li>
            ))}
        </ol>
    );
};

export default HallOfFame;
