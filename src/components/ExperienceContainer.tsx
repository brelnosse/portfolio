import { ExperienceProps } from "../types/experience.type";
import Experience from "./Experience";
import Underlined from "./Underlined";
import { experiences } from '../data/experiences';
//@ts-ignore
import '../assets/style/experienceContainer.css';
import { useRef } from "react";
import { useSection } from "../hooks/useSection";
const ExperienceContainer: React.FC = () => {
    const ExperienceContainerRef = useRef<HTMLElement>(null);
    useSection(ExperienceContainerRef, 'expériences');
    return (
            <section className="experiences" ref={ExperienceContainerRef}>
                <Underlined text='Experience'/>
                <div className="experience_container">
                   {
                    experiences.map((el:ExperienceProps, i:number) => 
                        <Experience 
                            key={el.enterprise.split(' ').join(' ')+i}
                            enterprise={el.enterprise} 
                            period={el.period} 
                            website={el.website}
                            postTitle={el.postTitle} 
                            location={el.location}
                            skills={el.skills}
                            tools={el.tools}
                        />)
                   }
                </div>
            </section>
    );
}
export default ExperienceContainer;