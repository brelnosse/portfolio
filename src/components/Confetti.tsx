import { useEffect, useRef } from "react";

const COLORS = ['#FFD23F', '#FF8AD8', '#74F2A8', '#5B8CFF', '#FF7F5C'];

type ConfettiProps = {
    count?: number;
    /** origine de l'explosion, en fraction de la fenêtre */
    originX?: number;
    originY?: number;
    duration?: number;
};

/** Explosion de confettis néo-brutalistes (canvas, s'arrête et se nettoie seule). */
const Confetti: React.FC<ConfettiProps> = ({ count = 160, originX = 0.5, originY = 0.4, duration = 4.5 }) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const cx = window.innerWidth * originX;
        const cy = window.innerHeight * originY;
        const parts = Array.from({ length: count }, (_, i) => {
            const a = Math.random() * Math.PI * 2;
            const s = 380 + Math.random() * 720;
            return {
                x: cx, y: cy,
                vx: Math.cos(a) * s, vy: Math.sin(a) * s - 380,
                rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 14,
                w: 9 + Math.random() * 11, h: 7 + Math.random() * 8,
                color: COLORS[i % COLORS.length], tri: i % 3 === 0,
            };
        });

        let raf = 0;
        let last = performance.now();
        const start = last;
        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 1 / 30);
            last = now;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#111111';
            for (const p of parts) {
                p.vy += 1500 * dt;
                p.vx *= 1 - dt * 1.2;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.rot += p.vr * dt;
                if (p.y > window.innerHeight + 40) continue;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                if (p.tri) {
                    ctx.beginPath();
                    ctx.moveTo(0, -p.h);
                    ctx.lineTo(p.w / 2, p.h / 2);
                    ctx.lineTo(-p.w / 2, p.h / 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else {
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
                }
                ctx.restore();
            }
            if ((now - start) / 1000 < duration) raf = requestAnimationFrame(tick);
            else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, [count, originX, originY, duration]);

    return <canvas ref={ref} className="confetti-canvas" aria-hidden="true" />;
};

export default Confetti;
