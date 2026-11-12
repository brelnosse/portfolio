import React from "react";

type MarqueeProps = {
    items: string[];
    variant?: 'ink' | 'yellow';
    tilt?: boolean;
};

/** Bande défilante néo-brutaliste. Le contenu est dupliqué pour une boucle continue en CSS pur. */
const Marquee: React.FC<MarqueeProps> = ({ items, variant = 'ink', tilt = false }) => {
    const loop = [...items, ...items];
    return (
        <div className={`marquee ${variant === 'yellow' ? 'yellow' : ''} ${tilt ? 'tilt' : ''}`} aria-hidden="true">
            <div className="marquee-track">
                {loop.map((item, i) => (
                    <span className="marquee-item" key={`${item}-${i}`}>{item}</span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
