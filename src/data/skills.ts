import { 
    faDatabase, 
    faExchangeAlt, 
    faGears, 
    faPlug, 
    fas, 
    faTable, 
    faVial,
    faChartLine,
    faSquareRootVariable,
    faCode // Utilisé pour représenter C / C++
} from "@fortawesome/free-solid-svg-icons";
import { SkillsCardProps } from "../types/skillscard.type";
import { 
    faCss, 
    faCss3, 
    faFigma, 
    faFlutter, 
    faGithub, 
    faHtml5, 
    faJava, 
    faJs, 
    faNode, 
    faNodeJs, 
    faPhp, 
    faPython, // Ajout de l'icône Python
    faReact 
} from "@fortawesome/free-brands-svg-icons";

export const Skills: SkillsCardProps[] = [
    {
        icon: faPython,
        text: 'Python',
        active: false,
        tooltip: {
            title: {
                icon: faPython,
                text: 'Python'
            },
            description: 'Analyse de données : manipulation, nettoyage et visualisation de jeux de données.'
        }
    },
    {
        icon: faTable,
        text: 'NumPy / Pandas',
        active: false,
        tooltip: {
            title: {
                icon: faTable,
                text: 'NumPy / Pandas'
            },
            description: 'Calcul numérique, manipulation de DataFrames, nettoyage et agrégation de données.'
        }
    },
    {
        icon: faChartLine,
        text: 'Matplotlib / Seaborn',
        active: false,
        tooltip: {
            title: {
                icon: faChartLine,
                text: 'Matplotlib / Seaborn'
            },
            description: 'Visualisation de données : distributions, corrélations, séries temporelles.'
        }
    },
    {
        icon: faSquareRootVariable,
        text: 'SymPy',
        active: false,
        tooltip: {
            title: {
                icon: faSquareRootVariable,
                text: 'SymPy'
            },
            description: "Calcul symbolique : résolution d'équations, dérivées, intégrales."
        }
    },
    {
        icon: faCode,
        text: 'C / C++',
        active: false,
        tooltip: {
            title: {
                icon: faCode,
                text: 'C / C++'
            },
            description: "Programmation système et algorithmique (cursus 3iL)."
        }
    },
    {
        icon: faGithub,
        text: 'Github',
        active: false,
        tooltip: {
            title: {
                icon: faGithub,
                text: 'Github'
            },
            description: "Versionnage, branches et pull requests sur tous mes projets."
        }
    },
    {
        icon: faJava,
        text: 'Java',
        tooltip: {
            title: {
                icon: faJava,
                text: 'Java'
            },
            description: "POO, JavaFX et JDBC (application desktop ArchiveX).",
        },
        active: false,
    },
    {
        icon: faGears,
        text: 'CI/CD',
        active: false,
        tooltip: {
            title: {
                icon: faGears,
                text: 'CI/CD'
            },
            description: "Bases : déploiements automatisés Netlify / GitHub, Docker + Coolify."
        }
    },
    {
        icon: faVial,
        text: 'tests unitaires',
        active: false,
        tooltip: {
            title: {
                icon: faVial,
                text: 'tests unitaires'
            },
            description: "Tests unitaires avec Jest."
        }
    },
    {
        icon: faExchangeAlt,
        text: 'Rest API',
        active: false,
        tooltip: {
            title: {
                icon: faExchangeAlt,
                text: 'Rest API'
            },
            description: "Conception et consommation d'API REST (Node.js, NestJS)."
        }
    },
    {
        icon: faPlug,
        text: 'Swagger',
        active: false,
        tooltip: {
            title: {
                icon: faPlug,
                text: 'Swagger'
            },
            description: "Documentation des endpoints d'API."
        }
    },
    {
        icon: faJs,
        text: 'TypeScript',
        active: false,
        tooltip: {
            title: {
                icon: faJs,
                text: 'Typescript'
            },
            description: "Langage principal de mes projets web et mobile."
        }
    },
    {
        icon: faJs,
        text: 'Javascript',
        active: false,
        tooltip: {
            title: {
                icon: faJs,
                text: 'javascript'
            },
            description: "Front-end natif et React."
        }
    },
    {
        icon: faReact,
        text: 'React.js',
        active: false,
        tooltip: {
            title: {
                icon: faReact,
                text: 'React.js'
            },
            description: "SPA, hooks, intégration de maquettes Figma (stage Ovnicode).",
        },
    },
    {
        icon: faFigma,
        text: 'Figma',
        active: false,
        tooltip: {
            title: {
                icon: faFigma,
                text: 'Figma'
            },
            description: "Maquettes UI : PrintSpot, ThayiPizza."
        }
    },
    {
        icon: faCss3,
        text: 'CSS3',
        active: false,
        tooltip: {
            title: {
                icon: faCss3,
                text: 'CSS3'
            },
            description: "Mise en page responsive et animations."
        }
    },
    {
        icon: faTable,
        text: 'SQL',
        active: false,
        tooltip: {
            title: {
                icon: faTable,
                text: 'SQL'
            },
            description: "Requêtes, modélisation relationnelle, PL/SQL."
        }
    },
    {
        icon: faTable,
        text: 'PostgreSQL',
        active: false,
        tooltip: {
            title: {
                icon: faTable,
                text: 'PostgreSQL'
            },
            description: "Base principale de PrintSpot et KmerCoin."
        }
    },
    {
        icon: faHtml5,
        text: 'HTML5',
        active: false,
        tooltip: {
            title: {
                icon: faHtml5,
                text: 'HTML'
            },
            description: "Structure sémantique des interfaces."
        }
    },
    {
        icon: faDatabase,
        text: 'MongoDB',
        active: false,
        tooltip: {
            title: {
                icon: faDatabase,
                text: 'MongoDB'
            },
            description: "Stockage NoSQL (Miam, ThayiPizza)."
        }
    },
    {
        icon: fas.faFire,
        text: 'Firebase',
        active: false,
        tooltip: {
            title: {
                icon: fas.faFire,
                text: 'Firebase'
            },
            description: "Auth et temps réel (Vanish, ThayiPizza)."
        }
    },
    {
        icon: faPhp,
        text: 'PHP',
        active: false,
        tooltip: {
            title: {
                icon: faPhp,
                text: 'PHP'
            },
            description: "Back-end et CRUD MySQL (stage Like-concept)."
        }
    },
    {
        icon: faNodeJs,
        text: 'Node.js',
        active: false,
        tooltip: {
            title: {
                icon: faNodeJs,
                text: 'Node.js'
            },
            description: "APIs REST, NestJS, files de tâches BullMQ."
        }
    },
    {
        icon: faFlutter,
        text: 'Flutter',
        active: false,
        tooltip: {
            title: {
                icon: faFlutter,
                text: 'Flutter'
            },
            description: "Application mobile Vanish (Dart).",
        },
    },
];