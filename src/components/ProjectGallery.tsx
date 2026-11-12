import { useCallback, useEffect, useRef, useState } from "react";

type ProjectGalleryProps = {
    title: string;
    images: string[];
};

/**
 * Alternative mobile au cube 3D : bande de captures à faire défiler au doigt
 * (scroll-snap natif, images chargées seulement quand la galerie est affichée).
 */
const ProjectGallery: React.FC<ProjectGalleryProps> = ({ title, images }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const slide = track.firstElementChild as HTMLElement | null;
                if (!slide) return;
                const step = slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
                setCurrent(Math.round(track.scrollLeft / step));
            });
        };
        track.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            track.removeEventListener('scroll', onScroll);
        };
    }, []);

    const goTo = useCallback((index: number) => {
        const track = trackRef.current;
        const slide = track?.children[index] as HTMLElement | undefined;
        if (!track || !slide) return;
        track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2, behavior: 'smooth' });
    }, []);

    return (
        <div className="p-gallery">
            <div className="p-gallery-track" ref={trackRef}>
                {images.map((src, i) => (
                    <figure className={`p-shot${i === current ? ' current' : ''}`} key={src}>
                        <img src={src} alt={`${title}, capture ${i + 1} sur ${images.length}`} loading="lazy" decoding="async" />
                    </figure>
                ))}
            </div>
            <div className="p-gallery-nav">
                <span className="p-gallery-count">{String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
                <div className="p-gallery-dots">
                    {images.map((src, i) => (
                        <button
                            type="button"
                            key={src}
                            className={i === current ? 'on' : ''}
                            aria-label={`Voir la capture ${i + 1}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectGallery;
