import { SkillsResumeCardprops } from "../types/skillsresumecard.type";
import { SkillResumeContainerProps } from "../types/skillsresumecontainer.type";
import SkillsResumeCard from "./SkillsResumeCard";
import Underlined from "./Underlined";
//@ts-ignore
import '../assets/style/skillresumecontainer.css';
import { useRef } from "react";
import { useSection } from "../hooks/useSection";

const SkillResumeContainer: React.FC<SkillResumeContainerProps> = ({ skillsResumeItems }) => {
    const skillResumeRef = useRef<HTMLElement>(null);
    useSection(skillResumeRef, 'compétences');
    return (
        <section className='resume' ref={skillResumeRef}>
            <Underlined text="Qu'est-ce que je fais ?" />
            
            <div className="skillsResume_container">
                {
                    skillsResumeItems.map((el: SkillsResumeCardprops, i: number) => {
                        return <SkillsResumeCard 
                            image={el.image} 
                            title={el.title} 
                            description={el.description} 
                            key={`${el.title + i}`} 
                            index={i} 
                        />
                    })
                }
            </div>
        </section>
    );
}

export default SkillResumeContainer;