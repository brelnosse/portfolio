import React, { useEffect, useRef } from "react";
//@ts-ignore
import '../assets/style/project.css';
import Button from "./Button";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ProjectProps } from "../types/project.type";
import { SkillsCardProps } from "../types/skillscard.type";
import SkillsCard from "./SkillsCard";
import ProjectGallery from "./ProjectGallery";

const Project: React.FC<ProjectProps> = ({ title, color, githubUrl, type, url, imgUrl, description, features, skills }) => {
    const projectRef = useRef<HTMLDivElement>(null);
    const cubeRef = useRef<HTMLDivElement>(null);
    const firstDescriptionRef = useRef<HTMLDivElement>(null);
    const secondDescriptionRef = useRef<HTMLDivElement>(null);
    const thirdDescriptionRef = useRef<HTMLDivElement>(null);
    
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cubeRef.current || !projectRef.current) return;
        
        let isVisible = false;
        let ticking = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
            if (isVisible) handleScroll();
        }); 

        const descriptionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target as HTMLElement;
                const ratio = entry.intersectionRatio;

                const minScale = 0.9;
                const maxScale = 1;
                
                if (entry.isIntersecting) {
                    const progress = Math.min(1, Math.max(0, (ratio - 0.2) / 0.7));
                    const currentScale = minScale + (progress * (maxScale - minScale));
                    
                    target.style.transform = `scale(${currentScale})`;
                } else {
                    target.style.transform = `scale(${minScale})`;
                }
            });
        }, {
            threshold: Array.from({ length: 51 }, (_, i) => i / 50),
            rootMargin: "-50px 0px" 
        });

        if(firstDescriptionRef.current && secondDescriptionRef.current && thirdDescriptionRef.current){
            descriptionObserver.observe(firstDescriptionRef.current);
            descriptionObserver.observe(secondDescriptionRef.current);
            descriptionObserver.observe(thirdDescriptionRef.current);
        }
        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    // Écriture directe dans le DOM : aucun re-render React pendant le scroll.
                    if (isVisible && firstDescriptionRef.current && titleRef.current) {
                        const descRect = firstDescriptionRef.current.getBoundingClientRect();
                        const titleStickyPosition = 160;
                        const triggerDistance = 400;
                        const t = Math.max(0, Math.min(1, 0.5 - ((descRect.top - titleStickyPosition) / triggerDistance)));
                        titleRef.current.style.transform = `scale(${1 - t * 0.3})`;
                        titleRef.current.style.opacity = `${Math.max(0.4, 1 - t * 0.8)}`;
                    }

                    if (isVisible && projectRef.current && cubeRef.current) {
                        const rect = projectRef.current.getBoundingClientRect();
                        const rotation = (window.innerHeight - rect.top) * 0.15;
                        cubeRef.current.style.transform = `rotateY(${10 + rotation}deg)`;
                    }

                    ticking = false;
                });
            }
        };

        observer.observe(projectRef.current);
        window.addEventListener('scroll', handleScroll, { passive: true });
        

        handleScroll();

        return () => {
            observer.disconnect();
            descriptionObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="project" ref={projectRef}>
            <div className="cube-container">
                <div 
                    className="cube" 
                    ref={cubeRef} 
                    style={{ transform: 'rotateY(10deg)' }}
                >
                    <div className="side front" style={{backgroundImage: `url(${imgUrl[0]})`}}></div>
                    <div className="side back" style={{backgroundImage: `url(${imgUrl[1]})`}}></div>
                    <div className="side right" style={{backgroundImage: `url(${imgUrl[2]})`}}></div>
                    <div className="side left" style={{backgroundImage: `url(${imgUrl[3]})`}}></div>
                    <div className="side top"></div>
                    <div className="side bottom"></div>
                </div>
            </div>
            
            <div className="projectDescription" style={{ '--project-color': color } as React.CSSProperties}>
                <div className="p-title" ref={titleRef}>
                    <span className="p-type">{type}</span>
                    <h3>{title}</h3>
                    
                    <div className="p-btns-container" style={{display: 'flex', gap: '10px'}}>
                        {url !== '' && (
                            <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                                <Button 
                                    type='default' 
                                    valueText='Visiter' 
                                    style={{backgroundColor: color, color: 'white'}}
                                    valueIcon={fas.faUpRightFromSquare} 
                                    title={`Visiter ${title}`}
                                />
                            </a>
                        )}
                        {githubUrl !== '' && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                                <Button 
                                    type='light' 
                                    valueText='Github' 
                                    valueIcon={faGithub} 
                                    title="Voir le code source"
                                />
                            </a>
                        )}                        
                    </div>
                </div>

                <ProjectGallery title={title} images={imgUrl} />

                <>
                    <div className="projectTextDescription" ref={firstDescriptionRef}>
                        <h4>Description</h4>
                        <p className="description">
                            {description}
                        </p>
                    </div>
                </>
                <>
                    <div className="projectTextDescription" ref={secondDescriptionRef}>
                        <h4>Fonctionnalités clés</h4>
                        <ul>
                            {
                                features.map((el: string, i: number) => {
                                    return <li key={el.split(' ').join('-')+'-'+i}><span style={{backgroundColor: color}}>{el}</span></li>;
                                })
                            }
                        </ul>
                    </div>
                </>
                <>
                    <div className="projectTextDescription" ref={thirdDescriptionRef}>
                        <h4>Compétences</h4>
                        <div className="stacks">
                            {skills.map((el: SkillsCardProps, i: number) => (
                                <SkillsCard 
                                    key={`${el.text}-${i}`} 
                                    icon={el.icon} 
                                    text={el.text}
                                    bgColor={color}
                                />
                            ))}
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}

export default Project;