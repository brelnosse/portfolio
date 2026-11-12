import React, { useRef } from "react";
import { useSection } from "../hooks/useSection";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import HallOfFame from "./HallOfFame";
import SocialMedia from "./SocialMedia";
//@ts-ignore
import '../assets/style/footer.css';

const Footer: React.FC<{ onContact: () => void }> = ({ onContact }) => {
    const footerRef = useRef<HTMLElement>(null);
    useSection(footerRef, 'hall of fame');
    return (
        <footer className="site-footer" id="hall-of-fame" ref={footerRef}>
            <div className="footer-grid">
                <div className="footer-hof">
                    <span className="footer-tag">Hall of fame</span>
                    <h2>Un œuf se cache sur ce site 🥚</h2>
                    <p>Ceux qui l'ont trouvé y ont laissé leur nom. À toi de jouer… si tu le trouves.</p>
                    <HallOfFame limit={5} emptyText="Personne n'a encore trouvé l'œuf. Ouvre l'œil." />
                </div>
                <div className="footer-cta">
                    <span className="footer-tag pink">Stage · avril 2027</span>
                    <h2>On construit quelque chose ensemble&nbsp;?</h2>
                    <p>Je cherche un stage de 4 mois en développement logiciel & IA. Écris-moi, je réponds vite.</p>
                    <Button type="default" valueIcon={faEnvelope} valueText="Me contacter" onClick={onContact} />
                    <SocialMedia />
                </div>
            </div>
            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} Brel NOSSE</span>
            </div>
        </footer>
    );
};

export default Footer;
