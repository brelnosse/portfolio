import { useEffect, useRef } from "react";
import { schoolCareer } from "../data/schoolCareer";
import { CareerProps } from "../types/career.type";
import Career from "./Carreer";
import Underlined from "./Underlined";
//@ts-ignore
import '../assets/style/careerContainer.css';
import { useSection } from "../hooks/useSection";

const CareerContainer: React.FC = () =>{
    const educationSectionRef = useRef<HTMLElement>(null);
    const scrollIndicator = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useSection(educationSectionRef, 'education');
    useEffect(() => {
        const indicator = scrollIndicator.current;
        const track = containerRef.current;
        const section = educationSectionRef.current;

        if (!indicator || !track || !section) return;

        const handleScroll = () => {
            const rect = track.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            const maxTravel = (track.offsetHeight) - indicator.offsetHeight;
            const translateY = clampedProgress * maxTravel;

            indicator.style.transform = `translate(-50%, ${translateY}px)`;
        };
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            
            if (entry.isIntersecting) {
                window.addEventListener('scroll', handleScroll);
                handleScroll();
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        }, { 
            threshold: 0.3
        });

        observer.observe(section); 

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
            <section className='education section-animated' ref={educationSectionRef}>
                <Underlined text='Education'/>
                <div className="scholar-career_container">
                    <div className="sliderLevel" ref={containerRef}>
                        <span className="scrolling-indicator" ref={scrollIndicator}></span>
                        {
                            schoolCareer.map((el: CareerProps, i:number) =>{
                                return <Career 
                                        step={el.step} 
                                        postTitle={el.postTitle} 
                                        orgUrl={el.orgUrl}
                                        organization={el.organization}
                                        period={el.period} 
                                        skills={el.skills} 
                                        key={el.step+el.postTitle.split(' ').join('')}/>
                            })
                        }
                    </div>
                </div>
            </section>        
    );
}
export default CareerContainer;