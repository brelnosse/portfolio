import { RefObject, useEffect, useState } from "react";

/**
 * Passe à true dès que l'élément entre dans l'écran, puis ne revient jamais à false.
 * L'état vit dans React (pas de classList manipulée à la main) : un re-rendu ne peut pas l'effacer.
 */
export function useRevealOnce<T extends Element>(ref: RefObject<T | null>, rootMargin = '0px 0px -12% 0px'): boolean {
    const [isVisible, setIsVisible] = useState<boolean>(() =>
        typeof window === 'undefined'
        || !('IntersectionObserver' in window)
        || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const el = ref.current;
        if (isVisible || !el) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0, rootMargin });
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, rootMargin, isVisible]);

    return isVisible;
}
