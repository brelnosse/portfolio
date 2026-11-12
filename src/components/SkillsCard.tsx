import { SkillsCardProps } from "../types/skillscard.type";
//@ts-ignore
import '../assets/style/skillscard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolTip from "./ToolTip";
import { useState } from "react";

const SkillsCard: React.FC<SkillsCardProps> = ({ icon, text, active, bgColor, tooltip, skillsData, setSkillsData, ...props }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const isTooltipVisible = isHovered || !!active;

    return (
        <div
            className={`skills-card${active ? ' active' : ''}`}
            tabIndex={tooltip ? 0 : undefined}
            onMouseEnter={(e) => {
                setIsHovered(true);
                if (bgColor) (e.currentTarget as HTMLElement).style.backgroundColor = bgColor;
            }}
            onMouseLeave={(e) => {
                setIsHovered(false);
                if (bgColor) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--white)";
            }}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            {...props}>
            {
                tooltip &&
                <ToolTip
                    title={{
                        icon: tooltip?.title.icon,
                        text: tooltip?.title.text
                    }}
                    skillsData={skillsData}
                    active={active}
                    setSkillsData={setSkillsData}
                    isHovered={isTooltipVisible}
                    setIsHovered={setIsHovered}
                    description={tooltip.description} />
            }
            {icon && <FontAwesomeIcon icon={icon} style={{ marginBottom: '-1px', fontSize: '15px', marginRight: '4px' }} />}
            {text}
        </div>
    );
}
export default SkillsCard;
