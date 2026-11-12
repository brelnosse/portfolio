import { faCss, faCss3, faDartLang, faFigma, faFlutter, faHtml5, faJava, faJs, faNode, faNodeJs, faPhp, faReact } from "@fortawesome/free-brands-svg-icons";
import { ProjectProps } from "../types/project.type";
import { faChartLine, faCode, faDatabase, faFire, faLock, faPanorama } from "@fortawesome/free-solid-svg-icons";

export const projets:ProjectProps[] = [
{
    title: 'PrintSpot',
    color: '#2563eb',
    type: 'fullstack',
    imgUrl: [
        require('../assets/images/printspotAppFront.webp'),
        require('../assets/images/printspotAppBack.webp'),
        require('../assets/images/printspotAppLeft.webp'),
        require('../assets/images/printspotAppRight.webp'),
    ],
    description: "Marketplace sécurisée pensée pour le Cameroun. Les transactions passent par un système de séquestre Mobile Money avec confirmation QR code, négociation de prix intégrée et protection acheteur via litige. L'écosystème comprend une application mobile, un back-office web et un agent d'impression PC. Les paiements ne sont libérés qu'après validation de la livraison.",
    features: [
        'Escrow Mobile Money (KPay) + confirmation QR code',
        'Agent d\'impression desktop connecté par code à 8 chiffres',
        'KYC vendeur & gestion des signalements',
        'Notifications multi-canaux (Push Expo, WhatsApp, SMS Orange, Email)',
        'Gestion des tâches asynchrones (Redis & BullMQ)',
        'Déploiement auto-hébergé via Coolify et Docker'
    ],
    url: 'https://printspot.app',
    githubUrl: '',
    skills: [
        {
            icon: faJs,
            text: 'TypeScript'
        },
        {
            icon: faReact,
            text: 'React Native (Expo) / Vite'
        },
        {
            icon: faNode,
            text: 'NestJS'
        },
        {
            icon: faDatabase,
            text: 'PostgreSQL / TypeORM'
        },
    ]
},
{
    title: 'KmerCoin',
    color: '#F97316',
    type: 'fullstack',
    imgUrl: [
        require('../assets/images/kmercoinFront.webp'),
        require('../assets/images/kmercoinBack.webp'),
        require('../assets/images/kmercoinLeft.webp'),
        require('../assets/images/kmercoinRight.webp'),
    ],
    description: "Marketplace sécurisée pensée pour le Cameroun. Les transactions passent par un système de séquestre Mobile Money avec confirmation QR code, négociation de prix intégrée et protection acheteur via litige. Les vendeurs sont vérifiés par KYC et les paiements ne sont libérés qu'après validation de la livraison.",
    features: [
        'Escrow Mobile Money + confirmation QR code',
        'Système de négociation et achat direct',
        'KYC vendeur & gestion des litiges',
        'Notifications multi-canaux (SMS, Email, WebSocket)',
        'Back-office admin complet',
        'Authentification Google OAuth2'
    ],
    url: 'https://kmercoin.netlify.app',
    githubUrl: '',
    skills: [
        {
            icon: faJs,
            text: 'TypeScript'
        },
        {
            icon: faReact,
            text: 'React.js'
        },
        {
            icon: faNode,
            text: 'Node.js'
        },
        {
            icon: faDatabase,
            text: 'Prisma / PostgreSQL'
        },
    ]
},
{
        title: 'Vanish',
        color: '#B026FF',
        type: 'mobile',
        imgUrl: [
            require('../assets/images/vanishFront.webp'), 
            require('../assets/images/vanishBack.webp'), 
            require('../assets/images/vanishLeft.webp'), 
            require('../assets/images/vanishRight.webp'), 
        ],
        description: "Application de messagerie instantanée ultra-sécurisée axée sur la confidentialité. Vanish garantit l'anonymat et le contrôle des données grâce à un système de messages éphémères et un chiffrement de bout en bout.",
        features: [
            'Chiffrement E2EE & Messages éphémères',
            'Protection anti-capture d’écran et sécurité biométrique',
            'Architecture temps réel avec Firebase & Cloud Storage',
            'Expérience utilisateur immersive (Dark Mode & Animations)',
        ],
        url: 'https://vanish-alpha.netlify.app/',
        githubUrl: '',
        skills: [
            {
                icon: faFlutter,
                text: 'Flutter'
            },
            {
                icon: faDartLang,
                text: 'Dart'
            },
            {
                icon: faFire,
                text: 'Firebase'
            },
            {
                icon: faLock,
                text: 'E2EE Security'
            },
        ] 
    },
    {
        title: 'Mon portfolio',
        color: '#2a5b69',
        type: 'web',
        imgUrl: [
            require('../assets/images/portfolioFront.webp'), 
            require('../assets/images/portfolioBack.webp'), 
            require('../assets/images/portfolioLeft.webp'), 
            require('../assets/images/portfolioRight.webp'), 
        ],
        description: "Premier projet vitrine pour centraliser mes travaux académiques et personnels. Conçu pour explorer l'écosystème React et Typescript tout en soignant l'expérience utilisateur.",
        features: [
            'Interactivité et animations',
            'Formulaire de contact dynamique',
            'Architecture responsive'
        ],
        url: '',
        githubUrl: 'https://github.com/brelnosse/portofolio',
        skills: [
            {
                icon: faJs,
                text: 'Typescript'
            },
            {
                icon: faReact,
                text: 'React.js'
            },
            {
                icon: faCss3,
                text: 'CSS3'
            },
        ] 
    },
    {
        title: 'Miam',
        color: '#f5700a',
        type: 'web',
        imgUrl: [
            require('../assets/images/miamFront.webp'), 
            require('../assets/images/miamRight.webp'), 
            require('../assets/images/miamBack.webp'), 
            require('../assets/images/miamLeft.webp'), 
        ],
        description: "Projet d'apprentissage full-stack autour de la gastronomie camerounaise. L'objectif était de pratiquer l'intégration d'une base de données et de comprendre les flux d'authentification sécurisés.",
        features: [
            'Consultation de recettes interactives',
            'Initiation au stockage NoSQL (MongoDB)',
            'Mise en œuvre d\'une connexion utilisateur (JWT)',
            'Recherche de marchés locaux'
        ],
        url: 'https://miamcmr.netlify.app',
        githubUrl: '',
        skills: [
            {
                icon: faJs,
                text: 'Typescript'
            },
            {
                icon: faReact,
                text: 'React.js'
            },
            {
                icon: faNodeJs,
                text: 'Node.js'
            },
            {
                icon: faDatabase,
                text: 'MongoDB'
            },
            {
                icon: faCss3,
                text: 'CSS3'
            },
            {
                icon: faChartLine,
                text: 'Chart.js'                
            },
        ] 
    },    
    {
        title: 'Thayipizza',
        color: '#e82a33',
        type: 'web',
        imgUrl: [
            require('../assets/images/thayipizzaFront.webp'), 
            require('../assets/images/thayipizzaRight.webp'), 
            require('../assets/images/thayipizzaBack.webp'), 
            require('../assets/images/thayipizzaLeft.webp'), 
        ],
        description: "Une exploration des services Cloud et temps réel à travers une application de commande. Ce projet m'a permis de me familiariser avec Firebase et la gestion d'un panier d'achat dynamique.",
        features: [
            'Interface de commande intuitive',
            'Authentification multi-canaux (Firebase/JWT)',
            'Gestion dynamique du menu',
            'Suivi simplifié des commandes'
        ],
        url: 'https://thayipizza.netlify.app',
        githubUrl: '',
        skills: [
            {
                icon: faJs,
                text: 'Javascript'
            },
            {
                icon: faReact,
                text: 'React.js'
            },
            {
                icon: faNodeJs,
                text: 'Node.js'
            },
            {
                icon: faDatabase,
                text: 'MongoDB'
            },
            {
                icon: faCss3,
                text: 'CSS3'
            },
            {
                icon: faChartLine,
                text: 'Chart.js'                
            },
            {
                icon: faFire,
                text: 'Firebase'                
            },
        ] 
    },
    {
        title: 'IUCBibli',
        color: '#e82a33',
        type: 'web',
        imgUrl: [
            require('../assets/images/iucbibliFront.webp'), 
            require('../assets/images/iucbibliBack.webp'), 
            require('../assets/images/iucbibliRight.webp'), 
            require('../assets/images/iucbibliLeft.webp'), 
        ],
        description: "Projet de gestion de bibliothèque développé pour renforcer mes bases en PHP et en manipulation de bases de données relationnelles (MySQL).",
        features: [
            'Catalogue d\'ouvrages administrable',
            'Gestion des flux d\'emprunts',
            'Moteur de recherche par critères',
            'Statistiques d\'utilisation (Chart.js)'
        ],
        url: 'https://sevux.alwaysdata.net',
        githubUrl: 'https://github.com/brelnosse/iucbibli',
        skills: [
            {
                icon: faHtml5,
                text: 'HTML'
            },
            {
                icon: faJs,
                text: 'Javascript'
            },
            {
                icon: faPhp,
                text: 'PHP'
            },
            {
                icon: faCss3,
                text: 'CSS3'
            },
            {
                icon: faDatabase,
                text: 'MySQL'
            },
            {
                icon: faChartLine,
                text: 'Chart.js'                
            },
        ] 
    },
    {
        title: 'PrintSpot (UI)',
        color: '#2fcc70',
        type: 'ui-design',
        imgUrl: [
            require('../assets/images/printspotFront.webp'), 
            require('../assets/images/printspotBack.webp'), 
            require('../assets/images/printspotRight.webp'), 
            require('../assets/images/printspotLeft.webp'), 
        ],
        description: "Une incursion dans le développement mobile avec React Native pour comprendre les spécificités des interfaces tactiles et du stockage local.",
        features: [
            'Prise de notes simplifiée',
            'Stockage persistant sur mobile',
            'Gestion de thèmes (Sombre/Clair)',
            'Optimisation des performances'
        ],
        url: 'https://www.figma.com/proto/FdzJT32K4Mwxf3r4iJxVnD/PrintSpot?t=ouJJCyMjiUytkPkZ-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=18-60',
        githubUrl: '',
        skills: [
            {
                icon: faFigma,
                text: 'Figma'
            }
        ] 
    },
    {
        title: 'ThayiPizza (UI)',
        color: '#ff0051',
        type: 'ui-design',
        imgUrl: [
            require('../assets/images/thayiUiFront.webp'), 
            require('../assets/images/thayiUiBack.webp'), 
            require('../assets/images/thayiUiRight.webp'), 
            require('../assets/images/thayiUiLeft.webp'), 
        ],
        description: "10 écrans pour une application web de commande de pizzas",
        features: [
            'Optimisation du parcours de commande (UX)',
            'Mise en valeur visuelle des produits',
            'Design de l\'interface du panier', 
        ],
        url: 'https://www.figma.com/proto/FqGTHgUcCOO69SLgEVCZuy/ThayiPizza?node-id=1-222&p=f&t=o200wAMsFllFJhUn-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
        githubUrl: '',
        skills: [
            {
                icon: faFigma,
                text: 'Figma'
            }
        ] 
    },
    {
        title: 'noteApp',
        color: '#02bf8d',
        type: 'mobile',
        imgUrl: [
            require('../assets/images/noteAppFront.webp'), 
            require('../assets/images/noteAppBack.webp'), 
            require('../assets/images/noteAppRight.webp'), 
            require('../assets/images/noteAppLeft.webp'), 
        ],
        description: "Application de prise de note simple réalisé avec react native dans le but de consolider mes compétences.",
        features: [
            'Ajout d\'une note',
            'Suppression d\'une note',
            'Modification d\'une note',
            'Changement de thème' 
        ],
        url: 'https://github.com/brelnosse/noteApp/blob/main/builds/',
        githubUrl: 'https://github.com/brelnosse/noteApp',
        skills: [
            {
                icon: faReact,
                text: 'React native'
            },
            {
                icon: faCss,
                text: 'Css'
            }
        ] 
    },
    {
        title: 'ArchiveX',
        color: '#ff0051',
        type: 'desktop',
        imgUrl: [
            require('../assets/images/archiveXFront.webp'), 
            require('../assets/images/archiveXBack.webp'), 
            require('../assets/images/archiveXRight.webp'), 
            require('../assets/images/archiveXLeft.webp'), 
        ],
        description: "Logiciel de gestion de documents académiques réalisé en Java. Un exercice pratique sur les architectures logicielles Desktop et les interfaces graphiques structurées.",
        features: [
            'Archivage sécurisé de fichiers',
            'Interface utilisateur JavaFX',
            'Structuration des données XML/MySQL',
            'Filtrage avancé des documents'
        ],
        url: '',
        githubUrl: 'https://github.com/brelnosse/archiveX',
        skills: [
            {
                icon: faJava,
                text: 'Java'
            },
            {
                icon: faJava,
                text: 'JavaFx'
            },
            {
                icon: faDatabase,
                text: 'MySQL'
            },
            {
                icon: faCss,
                text: 'CSS'
            },
            {
                icon: faCode,
                text: 'XML'
            }
        ] 
    }
]