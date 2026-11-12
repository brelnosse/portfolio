import { fas } from "@fortawesome/free-solid-svg-icons";
import { MenuItemType } from "../types/navbar.types";

export const MenuItems:MenuItemType[] = [
    {
        icon: fas.faUser,
        displayText: 'A propos',
        sectionId: 'aboutme'
    },
    {
        icon: fas.faCodeBranch,
        displayText: 'Compétences',
        sectionId: 'skills'
    },
    {
        icon: fas.faGraduationCap,
        displayText: 'Education',
        sectionId: 'education'
    },
    {
        icon: fas.faBrain,
        displayText: 'Expériences',
        sectionId: 'experience'
    },
    {
        icon: fas.faCogs,
        displayText: 'projets',
        sectionId: 'projets'
    }
];