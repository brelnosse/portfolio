import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { SkillsCardProps } from "./skillscard.type";
import { Dispatch, SetStateAction } from "react";

export interface ToolTipProps {
    title:{
        icon: IconDefinition;
        text: string;
    },
    isHovered ?: boolean;
    setIsHovered ?: (val: boolean) => void;
    active ?: boolean;
    description: string;
    skillsData ?: SkillsCardProps[];
    setSkillsData ?: Dispatch<SetStateAction<SkillsCardProps[]>>;
};