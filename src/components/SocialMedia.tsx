import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
//@ts-ignore
import '../assets/style/socialMedia.css';
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { socialLinks } from "../data/socialLinks";

const SocialMedia: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(function(){
                        setIsVisible(true);
                    }, 300)
                }else{
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);


    return (
        <div 
            ref={containerRef} 
            className={`socialsContainer ${isVisible ? 'animate-in' : ''}`} 
            {...props}
        >
            {socialLinks.map((link, index) => (
                <Link 
                    key={index} 
                    to={link.to} 
                    target='_blank' 
                    className="social-link"
                >
                    <FontAwesomeIcon icon={link.icon}/>
                </Link>
            ))}
        </div>
    );
} 

export default SocialMedia;