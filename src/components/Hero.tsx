import Button from "./Button";
import { useEffect, useRef, useState } from "react";
//@ts-ignore
import '../assets/style/hero.css';
//@ts-ignore
import { MenuItems } from "../data/menuItems";
import MainStack from "./MainStack";
import HallOfFameBadge from "./HallOfFameBadge";
import squaresIcon from "../assets/images/icons/squares.svg";
import starIcon from "../assets/images/icons/star.svg";
import profilePhoto from "../assets/images/pp.webp";
import { useSection } from "../hooks/useSection";

const Hero: React.FC<{isFormVisible: boolean; setIsFormVisible: (v: boolean) => void;}> = ({isFormVisible, setIsFormVisible}) => {
    const name = "Brel NOSSE";
    const [showH3, setShowH3] = useState<boolean>(false);
    const [showIm, setShowIm] = useState<boolean>(false);
    const [visibleLetters, setVisibleLetters] = useState<number>(0);
    const [showLine, setShowLine] = useState<boolean>(false);
    const [showH4Text, setShowH4Text] = useState<boolean>(false);
    const [showButton1, setShowButton1] = useState<boolean>(false);
    const [showButton2, setShowButton2] = useState<boolean>(false);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [showMainStack, setShowMainStack] = useState<boolean>(false);
    const heroRef = useRef<HTMLDivElement | null>(null);
    useSection(heroRef, 'hero')
    
    useEffect(() => {
        const navbarAnimationTime = 50 + (MenuItems.length * 150) + 200 + 300;

        const h3Timer = setTimeout(() => setShowH3(true), navbarAnimationTime);

        const imTimer = setTimeout(() => setShowIm(true), navbarAnimationTime + 500);

        const nameStartDelay = setTimeout(() => {
            const interval = setInterval(() => {
                setVisibleLetters(prev => {
                    if (prev >= name.length) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 120);
            return () => clearInterval(interval);
        }, navbarAnimationTime + 900);

        const lineDelay = setTimeout(() => {
            setShowLine(true);
        }, navbarAnimationTime + 900 + (name.length * 120) + 300);

        const h4TextDelay = setTimeout(() => {
            setShowH4Text(true);
        }, navbarAnimationTime + 900 + (name.length * 120) + 300 + 900);

        const button1Delay = setTimeout(() => {
            setShowButton1(true);
        }, navbarAnimationTime + 900 + (name.length * 120) + 300 + 900 + 500);

        const button2Delay = setTimeout(() => {
            setShowButton2(true);
        }, navbarAnimationTime + 900 + (name.length * 120) + 300 + 900 + 500 + 200);

        const imageDelay = setTimeout(() => {
            setShowImage(true);
        }, navbarAnimationTime + 900 + (name.length * 120) + 300 + 900 + 500 + 200 + 300);
        const mainStackDelay = setTimeout(() => {
                setShowMainStack(true);
        }, navbarAnimationTime + 900 + (name.length * 120) + 300 + 900 + 500 + 200 + 200);
        return () => {
            clearTimeout(h3Timer);
            clearTimeout(imTimer);
            clearTimeout(mainStackDelay);
            clearTimeout(nameStartDelay);
            clearTimeout(lineDelay);
            clearTimeout(h4TextDelay);
            clearTimeout(button1Delay);
            clearTimeout(button2Delay);
            clearTimeout(imageDelay);
        };
    }, []);

    // Le CV (avec coordonnées) n'est pas dans le dépôt public : son URL est fournie au build.
    const cvUrl = process.env.REACT_APP_CV_URL;
    const handleDownload = () => {
        if (cvUrl) window.open(cvUrl, '_blank', 'noopener');
    };

    let currentLetterCount = 0;

    return (
        <section className="hero" ref={heroRef}>
            <div className="heroDescription">
                <h3 className={`hero-h3 ${showH3 ? 'element-visible' : 'element-hidden'}`}>
                    <span className="hero-hello">Salut 👋 je suis</span>
                </h3>
                <h1>
                    <span className="primary">
                        {name.split(' ').map((word, wordIndex, wordsArray) => (
                            <span 
                                key={wordIndex} 
                                style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                            >
                                {word.split('').map((letter) => {
                                    const index = currentLetterCount++;
                                    return (
                                        <span
                                            key={index}
                                            className={`letter ${index < visibleLetters ? 'letter-visible' : 'letter-hidden'}`}
                                        >
                                            {letter}
                                        </span>
                                    );
                                })}
                                {wordIndex < wordsArray.length - 1 && (
                                    <span className={`letter ${currentLetterCount++ < visibleLetters ? 'letter-visible' : 'letter-hidden'}`}>
                                        {'\u00A0'}
                                    </span>
                                )}
                            </span>
                        ))}
                    </span>
                </h1>
                <h4>
                    <span className={`hero-line ${showLine ? 'line-visible' : 'line-hidden'}`}></span>
                    <span className={`hero-h4-text ${showH4Text ? 'element-visible' : 'element-hidden'}`}>
                        Élève ingénieur en développement logiciel, orienté Data & Machine Learning | En recherche d'un stage de 4 mois (avril 2027)
                    </span>
                </h4>
                <div className="actions">
                    <div className={`button-wrapper ${showButton1 ? 'button-visible' : 'button-hidden'}`}>
                        <Button type='default' valueText='Contactez-moi' onClick={()=>{
                            setIsFormVisible(true)
                        }}/>
                    </div>
                    {cvUrl && (
                        <div className={`button-wrapper ${showButton2 ? 'button-visible' : 'button-hidden'}`}>
                            <Button
                                type='light'
                                onClick={handleDownload}
                                valueText='Télécharger mon CV'/>
                        </div>
                    )}
                </div>
                <MainStack isVisible={showMainStack}/>
                <HallOfFameBadge isVisible={showMainStack}/>
            </div>
            <div className={`heroImg ${showImage ? 'image-visible' : 'image-hidden'}`}>
                <div className="heroImg-frame">
                    <img src={profilePhoto} alt="Brel NOSSE" className='profil' width={900} height={1100} fetchPriority="high"/>
                </div>
                <img src={squaresIcon} alt="" aria-hidden="true" className='s'/>
                <img src={starIcon} alt="" aria-hidden="true" className='r'/>
                <span className="hero-sticker">Dispo avril 2027</span>
            </div>
        </section>
    );
}

export default Hero;