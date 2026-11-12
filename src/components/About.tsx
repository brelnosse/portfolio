import React, { useRef, useEffect, useState } from "react";
import Underlined from "./Underlined";
import { useSection } from "../hooks/useSection";
//@ts-ignore
import '../assets/style/about.css';

const About: React.FC = () => {
    const AboutRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useSection(AboutRef, 'a propos');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }else{
                    setIsVisible(false);
                }
            },
            { threshold: 0.3 }
        );

        if (AboutRef.current) {
            observer.observe(AboutRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section 
            className={`aboutme ${isVisible ? 'active' : ''}`} 
            ref={AboutRef}
        >
            <Underlined text='Qui suis-je ?'/>
            
            <div className="aboutContainer">
                {/* On ajoute la classe de base reveal-item pour l'animation */}
                <div className="profileCaption reveal-item">
                    <div className="pc-description">
                        <h3>Brel NOSSE</h3>
                        <h4>Élève ingénieur · 3iL</h4>
                        <ul className="pc-tags">
                            <li>Full-stack</li>
                            <li>Data</li>
                            <li>ML en cours</li>
                        </ul>
                    </div>
                    <div className="pc-img" role="img" aria-label="Photo de Brel NOSSE"></div>
                </div>

                <p className="profileDescription reveal-item">
                    Étudiant à <span>3iL Ingénieurs</span> avec une solide base en <span>développement logiciel</span>, je m'oriente aujourd'hui vers la <span>data</span> et le <span>Machine Learning</span>. J'ai commencé par l'analyse de données en Python (NumPy, Pandas, Matplotlib, Seaborn) et je continue à me former sur les modèles de ML. Je recherche un <span>stage de 4 mois</span> à partir d'<span>avril 2027</span> en développement logiciel & IA.
                </p>
            </div>
        </section>
    );
}

export default About;