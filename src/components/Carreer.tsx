import { useCallback, useEffect, useRef, useState } from "react";
import { CareerProps } from "../types/career.type";
//@ts-ignore
import '../assets/style/career.css';
import MagicLink from "./MagicLink";
import { useRevealOnce } from "../hooks/useRevealOnce";
const Career: React.FC<CareerProps> = ({step, postTitle, orgUrl, organization, period, skills, ...props}) =>{
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const careerRef = useRef<HTMLDivElement>(null);

    const handleWindowResize = useCallback((): void =>{
        setWindowSize(window.innerWidth); 
    }, []);

    const isVisible = useRevealOnce(careerRef);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    return (
        <div 
            ref={careerRef}
            className={`career${windowSize > 597 ? (step%2 === 0 ? ' left' : '') : ''}${isVisible ? ' visible' : ''}`} 
            {...props}>
            <span className="indicator"></span>
            <div className="card scholar-career">
                <div className="scholar-career_text">
                    <h3>{postTitle}</h3>
                    <div className="timeline">
                        <h4 style={{fontSize: '0.8em'}}><MagicLink path={orgUrl} text={organization}/></h4>
                        <span className="badge">{period}</span>
                    </div>
                    <p>
                        <span className="primary">Compétences acquises</span>
                        {skills}
                    </p>
                </div>
            </div>
        </div>        
    );
}
export default Career;