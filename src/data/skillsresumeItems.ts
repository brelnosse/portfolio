import { SkillsResumeCardprops } from "../types/skillsresumecard.type";
import fullstackIcon from "../assets/images/icons/fullstack.svg";
import devicesIcon from "../assets/images/icons/devices.svg";
import dataIcon from "../assets/images/icons/data.svg";
import analysisIcon from "../assets/images/icons/analysis.svg";

export const skillsResumeItems: SkillsResumeCardprops[] = [
  {
    image: fullstackIcon,
    title: 'Développement Fullstack',
    description: 'Conception d’interfaces avec React et mise en place de logiques back-end via Node.js ou PHP.',
  },
  {
    image: devicesIcon,
    title: 'Mobile & Desktop',
    description: 'Création d’applications multi-plateformes avec Flutter et développement d’outils Java (JavaFX, Swing).',
  },
  {
    image: dataIcon,
    title: 'Analyse de Données',
    description: 'Exploration, nettoyage et visualisation de données en Python (NumPy, Pandas, Matplotlib, Seaborn), et gestion de bases PostgreSQL.',
  },
  {
    image: analysisIcon,
    title: 'Analyse de Besoins',
    description: 'Traduction technique des besoins utilisateurs via la modélisation UML pour structurer les projets.',
  }
]
