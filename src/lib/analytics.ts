// Google Analytics, chargé seulement si REACT_APP_GA_ID est défini au build.
// L'identifiant n'est pas écrit dans le dépôt public : chaque déploiement fournit le sien (ou aucun).

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function initAnalytics(): void {
    const id = process.env.REACT_APP_GA_ID;
    if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // gtag attend l'objet `arguments` tel quel
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id);
}
