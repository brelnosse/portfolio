import React, { useRef } from 'react';
import { ExperienceProps } from "../types/experience.type";
//@ts-ignore
import '../assets/style/experience.css';
import MagicLink from './MagicLink';
import { useRevealOnce } from '../hooks/useRevealOnce';

const Experience: React.FC<ExperienceProps> = ({enterprise, period, website, postTitle, location, skills, tools, ...props}) => {
    const domRef = useRef<HTMLDivElement>(null);
    const isVisible = useRevealOnce(domRef);

    const softColors = ["#FFD23F", "#FF8AD8", "#74F2A8", "#5B8CFF", "#FF7F5C", "#FFFFFF"];
    const getRandomColor = (index: number) => softColors[index % softColors.length];

    return (
    <div className={`experience ${isVisible ? 'visible' : ''}`} ref={domRef} {...props}> 
        <div className="line">
            <h3><MagicLink path={website} text={enterprise}/></h3>
            <span className="date">{period}</span>
        </div>
        
        <div className="line" style={{marginTop: '10px'}}>
            <h3 style={{fontSize: '1.1em', color: 'var(--primary-color)'}}>{postTitle}</h3>
            <span className='location'>{location}</span>
        </div>
        
        <ul className="skills_list">
            {skills.map((el: string, i: number) => (
                <li key={el + i} style={{ '--i': i } as React.CSSProperties}>
                    <span>{el}</span>
                </li>
            ))}                
        </ul>

        <div className="tools_container">
            <b style={{textAlign: 'center', display: 'block'}}>Outils</b>
            <div className="toools">
                {tools && tools.map((tool: string, i: number) => (
                    <span 
                        className="tools_pill" 
                        key={tool + i}
                        style={{ 
                            backgroundColor: getRandomColor(i),
                            '--i': i + skills.length 
                        } as React.CSSProperties}
                    >
                        {tool}
                    </span>
                ))} 
            </div>
        </div>            
    </div>        
    );
}

export default Experience;