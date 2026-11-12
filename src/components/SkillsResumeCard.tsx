import { SkillsResumeCardprops } from "../types/skillsresumecard.type";
//@ts-ignore
import '../assets/style/skillsresumecard.css';
import { useRef } from "react";
import { useRevealOnce } from "../hooks/useRevealOnce";

const SkillsResumeCard: React.FC<SkillsResumeCardprops & { index: number }> = ({ 
    image, 
    title, 
    description, 
    index, 
    ...props 
}) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const isVisible = useRevealOnce(cardRef);

    return (
        <div
            ref={cardRef}
            className={`card skills-resume_card${isVisible ? ' visible' : ''}`}
            style={{ transitionDelay: `${index * 0.15}s` }}
            {...props}
        >
            <span className="srcard-index">0{index + 1}</span>
            <img src={image} alt="" aria-hidden="true" width={64} height={64} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default SkillsResumeCard;