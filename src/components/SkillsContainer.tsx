import { SkillsCardProps } from "../types/skillscard.type";
import { SkillsContainerProps } from "../types/skillscontainer.type";
import SkillsCard from "./SkillsCard";
import Underlined from "./Underlined";
//@ts-ignore
import '../assets/style/skillscontainer.css';
import { useRef } from "react";
import { useSection } from "../hooks/useSection";
const SkillsContainer:React.FC<SkillsContainerProps> = ({skillsData, setSkillsData}) =>{
    const skillsContainerRef = useRef<HTMLElement>(null);
    useSection(skillsContainerRef, 'compétences');
    return (
            <section className='skills' ref={skillsContainerRef}>
                <Underlined text='Compétences'/>
                <div className="skills_container">
                    {
                        skillsData.map((el:SkillsCardProps, i:number) => {
                            return  <SkillsCard 
                                        icon={el.icon} 
                                        text={el.text} 
                                        key={`${el.text+i}`} 
                                        tooltip={el.tooltip} 
                                        skillsData={skillsData}
                                        setSkillsData={setSkillsData}
                                        active={el.active}/>
                        })
                    }
                </div>
            </section>        
    );
}
export default SkillsContainer;