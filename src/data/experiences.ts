import { ExperienceProps } from "../types/experience.type";

export const experiences: ExperienceProps[] = [
    {
        enterprise: 'Ovnicode Sarl',
        period: 'Juin 2025 - Août 2025',
        postTitle: 'Développeur Web Front-end (Stagiaire)',
        website: 'https://www.ovnicode.com/',
        location: 'Yaoundé, Cameroun',
        skills: [
            'Conception d\'interfaces UI/UX adaptatives',
            'Intégration de maquettes complexes avec React.js',
            'Mise en œuvre d\'une authentification sécurisée (JWT)',
            'Développement de tableaux de bord interactifs'
        ],
        tools: [
            'React.js', 
            'Figma', 
            'JWT', 
            'Mongo Atlas', 
            'Git/GitHub', 
            'Slack', 
            'VSCode'
        ],
    },
    {
        enterprise: 'Like-concept',
        period: 'Juin 2024 - Août 2024',
        postTitle: 'Développeur Fullstack (Stagiaire)',
        location: 'Douala, Cameroun',
        website: 'https://like-concept.cm/',
        skills: [
            'Conception d’architectures de données relationnelles (MySQL)',
            'Développement d’algorithmes de gestion des flux et alertes de retard',
            'Implémentation de fonctionnalités CRUD pour la gestion de stock',
            'Création d’interfaces d’administration en JavaScript natif'
        ],
        tools: [
            'PHP', 
            'MySQL', 
            'JavaScript', 
            'HTML5/CSS3', 
            'Git/Github', 
        ],
    }
]