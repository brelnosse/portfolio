import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolTipProps } from "../types/tooltip.type";
//@ts-ignore
import '../assets/style/tooltip.css';
import { SkillsCardProps } from "../types/skillscard.type";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const EDGE = 12;

const ToolTip: React.FC<ToolTipProps> = ({ isHovered, setIsHovered, title, active, description, skillsData, setSkillsData }) => {
    const toolRef = useRef<HTMLDivElement>(null);

    const handleCloseActiveSkills = useCallback((skillTitle: string) => {
        if (!setSkillsData || !skillsData) return;
        setSkillsData(
            skillsData.map((el: SkillsCardProps) =>
                el.tooltip?.title.text.trim().toLocaleLowerCase() === skillTitle.trim().toLocaleLowerCase()
                    ? { ...el, active: !el.active }
                    : el
            )
        );
    }, [skillsData, setSkillsData]);

    /** Place la bulle dans l'écran : décalage horizontal et bascule sous la pastille si la barre de navigation la cache. */
    const placeTooltip = useCallback(() => {
        const el = toolRef.current;
        const anchor = el?.parentElement;
        if (!el || !anchor) return;

        el.classList.remove('below');
        const card = anchor.getBoundingClientRect();
        const width = el.offsetWidth;
        const height = el.offsetHeight;

        let left = 0;
        if (card.left + width > window.innerWidth - EDGE) left = window.innerWidth - EDGE - width - card.left;
        if (card.left + left < EDGE) left = EDGE - card.left;
        el.style.left = `${left}px`;

        const arrowX = Math.min(Math.max(card.width / 2 - left, 18), width - 18);
        el.style.setProperty('--arrow-x', `${arrowX}px`);

        const navbarBottom = document.querySelector('.navbar-container')?.getBoundingClientRect().bottom ?? 0;
        if (card.top - height - 20 < navbarBottom + 8) el.classList.add('below');
    }, []);

    useLayoutEffect(() => {
        if (isHovered) placeTooltip();
    }, [isHovered, placeTooltip]);

    useEffect(() => {
        if (!isHovered) return;
        let raf = 0;
        const onChange = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(placeTooltip);
        };
        window.addEventListener('resize', onChange);
        window.addEventListener('scroll', onChange, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onChange);
            window.removeEventListener('scroll', onChange);
        };
    }, [isHovered, placeTooltip]);

    return (
        <div ref={toolRef} className={`tooltip${isHovered ? ' visible' : ''}`} role="tooltip">
            <div className="tooltip-header">
                <h2 className="tooltip-title">
                    <FontAwesomeIcon icon={title.icon} />
                    <span>{title.text}</span>
                </h2>
                {active && (
                    <span
                        className="close-tooltip"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCloseActiveSkills(title.text);
                            setIsHovered?.(false);
                        }}>
                        <FontAwesomeIcon icon={fas.faTimes} />
                    </span>
                )}
            </div>
            <p className="tooltip-description">{description}</p>
        </div>
    );
}
export default ToolTip;
