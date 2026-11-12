import { RefObject, useContext, useEffect } from "react";
import { SectionContext } from "../context/SectionContext";

/**
 * Détection de la section active (scroll-spy) : une seule règle pour toutes les sections.
 * La section active est la dernière dont le haut a dépassé une ligne de référence
 * (35 % de la hauteur de l'écran, sous la barre de navigation). Tout en bas de la page,
 * la dernière section enregistrée l'emporte (le pied de page est plus court que l'écran).
 */
const ACTIVATION_LINE = 0.35;

const sections = new Map<HTMLElement, string>();
let notify: ((section: string) => void) | null = null;
let current = '';
let frame = 0;

function computeActive() {
    frame = 0;
    if (!notify || sections.size === 0) return;
    const ordered = Array.from(sections.entries())
        .sort(([a], [b]) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const line = window.innerHeight * ACTIVATION_LINE;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    let active = ordered[0][1];
    if (atBottom) {
        active = ordered[ordered.length - 1][1];
    } else {
        for (const [el, name] of ordered) {
            if (el.getBoundingClientRect().top <= line) active = name;
        }
    }
    if (active !== current) {
        current = active;
        notify(active);
    }
}

function schedule() {
    if (!frame) frame = requestAnimationFrame(computeActive);
}

export const useSection = (ref: RefObject<HTMLElement | null>, section: string) => {
    const { setActiveSection } = useContext(SectionContext);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        notify = setActiveSection;
        sections.set(el, section);
        if (sections.size === 1) {
            window.addEventListener('scroll', schedule, { passive: true });
            window.addEventListener('resize', schedule);
        }
        schedule();
        return () => {
            sections.delete(el);
            if (sections.size === 0) {
                window.removeEventListener('scroll', schedule);
                window.removeEventListener('resize', schedule);
                current = '';
            }
        };
    }, [ref, section, setActiveSection]);
};
