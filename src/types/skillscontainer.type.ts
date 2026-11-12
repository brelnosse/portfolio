import { Dispatch, SetStateAction } from "react";
import { SkillsCardProps } from "./skillscard.type";

export interface SkillsContainerProps{
    skillsData: SkillsCardProps[],
    setSkillsData: Dispatch<SetStateAction<SkillsCardProps[]>>;
}