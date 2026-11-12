import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ToolTipProps } from "./tooltip.type";
import { Dispatch, SetStateAction } from "react";

export interface SkillsCardProps {
    icon?: IconDefinition;
    text: string;
    active ?: boolean;
    tooltip ?: ToolTipProps;
    bgColor ?: string;
    skillsData ?: SkillsCardProps[];
    setSkillsData ?: Dispatch<SetStateAction<SkillsCardProps[]>>;
}