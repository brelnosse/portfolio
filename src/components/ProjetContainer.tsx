import { useContext, useEffect, useRef, useState } from "react";
import { ProjectProps } from "../types/project.type";
import Project from "./Project";
import TabNavigation from "./TabNavigation";
import Underlined from "./Underlined";
import { projets } from "../data/projects";
//@ts-ignore
import '../assets/style/projectcontainer.css';
import { useSection } from "../hooks/useSection";

const ProjectContainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('tout');
    const projetsRef = useRef<HTMLElement>(null);
    useSection(projetsRef, 'projets');
    
    return (
        <section className="projets" ref={projetsRef}>
            <Underlined text='projets'/>
            <div className="projets_container">
                <div className="projets-container_header">
                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
                </div>
                <div className="my-projets">
                    {
                        projets.map((el: ProjectProps, i: number)=>{
                            if(activeTab !== 'tout' && el.type.toLocaleLowerCase() !== activeTab){
                                return;
                            }
                            return <Project 
                                key={el.title+i}
                                url={el.url} 
                                color={el.color}
                                title={el.title} 
                                imgUrl={el.imgUrl}
                                description={el.description} 
                                features={el.features}
                                disabled={false} 
                                type={el.type} 
                                githubUrl={el.githubUrl}
                                skills={el.skills}/>
                            }
                        )
                    }
                </div>
            </div>
        </section>
    );
}
export default ProjectContainer;