import { useEffect, useState } from "react";
import { SCORES_API } from "./HallOfFame";

/** Badge du Hero : compte les chasseurs d'œuf et descend jusqu'au hall of fame (pied de page). */
const HallOfFameBadge: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch(`${SCORES_API}?limit=1`, { signal: controller.signal, headers: { Accept: 'application/json' } })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((data) => setTotal(typeof data.total === 'number' ? data.total : 0))
            .catch(() => setTotal(0));
        return () => controller.abort();
    }, []);

    const goToHallOfFame = () => {
        const footer = document.getElementById('hall-of-fame');
        if (!footer) return;
        const navbarHeight = document.querySelector('.navbar-container')?.getBoundingClientRect().height ?? 0;
        window.scrollTo({ top: footer.getBoundingClientRect().top + window.scrollY - navbarHeight, behavior: 'smooth' });
    };

    const label = total && total > 0
        ? `${total} chasseur${total > 1 ? 's' : ''} d'œuf au hall of fame`
        : "Hall of fame : personne n'a encore trouvé l'œuf";

    return (
        <button
            type="button"
            className={`hof-badge ${isVisible ? 'element-visible' : 'element-hidden'}`}
            onClick={goToHallOfFame}
        >
            <span className="hof-badge-icon" aria-hidden="true">🏆</span>
            <span>{label}</span>
            <span className="hof-badge-arrow" aria-hidden="true">↓</span>
        </button>
    );
};

export default HallOfFameBadge;
