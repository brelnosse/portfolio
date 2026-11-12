import { Link, useLocation } from "react-router-dom";
//@ts-ignore
import '../assets/style/navbar.css';
import Button from "./Button";
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";
//@ts-ignore
import { MenuItems } from "../data/menuItems";
import { MenuItemType, NavbarProps } from "../types/navbar.types";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionContext } from "../context/SectionContext";
import ContactForm from "./ContactForm";
import avatar from "../assets/images/avatar.webp";

const NavbarItem: React.FC<MenuItemType & { animationDelay: number; isResponsive: boolean; isClosing: boolean;activeSection : string; setActiveSection : (b: string) => void; setIsVisible: (v: boolean) => void; setIsClosing: (v: boolean) => void}> = ({ 
    icon, 
    displayText, 
    animationDelay,
    isResponsive,
    sectionId,
    isClosing ,
    activeSection,
    setActiveSection,
    setIsVisible,
    setIsClosing
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    const handleClick = () => {
        const sectionClassName = sectionId.toLowerCase().trim() === 'home' ? 'hero' : sectionId.toLowerCase().trim().split(' ').join('');
        const section = document.querySelector('.'+sectionClassName);

        if(section)
            window.scrollTo({
                behavior: 'smooth',
                top: section?.getBoundingClientRect().y + window.scrollY - 84
            });
        
        if(isResponsive){
            setIsClosing(true);
            setTimeout(() => {
                setIsVisible(false);
                setIsClosing(false);
            }, MenuItems.length * 100 + 200);
        }
    }

    useEffect(() => {
        if (isClosing) {
            setIsAnimated(true);
            const timer = setTimeout(() => {
                setIsAnimated(false);
            }, animationDelay);
            return () => clearTimeout(timer);
        } else {
            setIsAnimated(false);
            const timer = setTimeout(() => {
                setIsAnimated(true);
            }, animationDelay);
            return () => clearTimeout(timer);
        }
    }, [animationDelay, isClosing]);

    const isActive = useCallback((current: string): string => {
        return (current.trim().toLocaleLowerCase() === activeSection.trim().toLocaleLowerCase() ? ' active' : '');
    }, [activeSection]);

    return (
        <li 
            className={`navbar-item${isActive(displayText.toLocaleLowerCase() === 'accueil' ? 'hero' : displayText)} ${isHovered && 'isHovered'} ${isAnimated ? (isResponsive ? 'item-visible-responsive' : 'item-visible') : (isResponsive ? 'item-hidden-responsive' : 'item-hidden')}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}>
            <span>
                <FontAwesomeIcon icon={icon}/>
            </span>
            <b>{displayText}</b>
        </li>
    );
}

const Navbar: React.FC<{isFormVisible: boolean; setIsFormVisible: (v: boolean) => void;  setIsAlertVisible: (v: boolean)=> void; setAlertDatas: Dispatch<SetStateAction<{ type: string; title: string; description: string; }>>}> = ({isFormVisible, setIsFormVisible,  setIsAlertVisible, setAlertDatas}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showTitle, setShowTitle] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(false);
    const [isResponsive, setIsResponsive] = useState<boolean>(false);
    const [menuKey, setMenuKey] = useState<number>(0);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const context = useContext(SectionContext);

    useEffect(() => {
        const titleTimer = setTimeout(() => {
            setShowTitle(true);
        }, 50);

        const buttonTimer = setTimeout(() => {
            setShowButton(true);
        }, 50 + (MenuItems.length * 150) + 200);

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    useEffect(() => {
        const checkResponsive = () => {
            if (window.innerWidth <= 1100) {
                setIsVisible(false);
                setIsResponsive(true);
            } else {
                setIsVisible(true);
                setIsResponsive(false);
            }
        };
        
        checkResponsive();
        
        const handleResize = (): void => {
            checkResponsive();
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShowMenu = (): void => {
        if (isVisible && isResponsive) {
            setIsClosing(true);
            setTimeout(() => {
                setIsVisible(false);
                setIsClosing(false);
            }, MenuItems.length * 100 + 200);
        } else {
            setIsClosing(false);
            setIsVisible(true);
            setMenuKey(prev => prev + 1);
        }
    }

    return (
        <nav className="navbar-container">
            <h2 className={`navbar-title ${showTitle ? 'title-visible' : 'title-hidden'}`}>
                <a
                    href="/"
                    className="brand-link"
                    aria-label="Retour en haut de la page"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    <img className="brand-mark" src={avatar} alt="" width={46} height={46} />
                    <span className="brand-text">Brel Nosse</span>
                </a>
            </h2>
            <ul className={`navbar-item_container ${isVisible ? 'show' : 'hide'}`}>
                {
                    MenuItems.map((el: MenuItemType, i: number) => {
                        const delay = isClosing 
                            ? (MenuItems.length - 1 - i) * 100 
                            : (isResponsive ? i * 100 : 100 + (i + 1) * 150);
                        
                        return (
                            <NavbarItem 
                                icon={el.icon} 
                                sectionId={el.sectionId}
                                displayText={el.displayText} 
                                animationDelay={delay}
                                isResponsive={isResponsive}
                                isClosing={isClosing}
                                activeSection={context.activeSection}
                                setActiveSection={context.setActiveSection}
                                setIsVisible={setIsVisible}
                                setIsClosing={setIsClosing}
                                key={`${el.displayText.split(' ').join('') + i + menuKey}`}
                            />
                        );
                    })
                }
                <li className={`action ${showButton ? 'button-visible' : 'button-hidden'}`}>
                    <Button 
                        type="default" 
                        valueText="Contactez-moi" 
                        textStyle="bold" 
                        onClick={()=>{
                            setIsFormVisible(true);
                        }}
                        style={{ margin: '10px 0px' }}
                    />
                </li>
            </ul>
            <div className="navbar-actions_container">
                <Button
                    type="light"
                    valueIcon={fas.faTrophy}
                    id="hallOfFameNavbtn"
                    className={context.activeSection === 'hall of fame' ? 'is-active' : undefined}
                    aria-label="Aller au hall of fame"
                    title="Hall of fame"
                    onClick={() => {
                        const footer = document.getElementById('hall-of-fame');
                        if (!footer) return;
                        const navbarHeight = document.querySelector('.navbar-container')?.getBoundingClientRect().height ?? 0;
                        window.scrollTo({ top: footer.getBoundingClientRect().top + window.scrollY - navbarHeight, behavior: 'smooth' });
                    }}
                />
                <Button 
                    type={'default'} 
                    valueText="Contactez-moi" 
                    textStyle="bold" 
                    valueIcon={fas.faPhone}
                    onClick={()=>{
                        setIsFormVisible(true);
                    }}
                    id="contactMeNavbtn"
                    aria-label="Contactez-moi"
                    title="Contactez-moi"
                />
                <Button 
                    type="default" 
                    valueIcon={isVisible ? fas.faTimes : fas.faBars} 
                    id="responsive-action" 
                    onClick={handleShowMenu} 
                    style={{ zIndex: '999', position: 'relative' }}
                />
            </div>
            <ContactForm isVisible={isFormVisible} setIsVisible={setIsFormVisible} setIsAlertVisible={setIsAlertVisible} setAlertDatas={setAlertDatas}/>
        </nav>
    );
}

export default Navbar;