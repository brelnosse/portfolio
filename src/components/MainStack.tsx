//@ts-ignore
import '../assets/style/mainstack.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stackItems } from "../data/stackItems";
interface MainStackProps {
    isVisible: boolean;
}

const MainStack: React.FC<MainStackProps> = ({ isVisible }) => {

    return (
        <div className={`mainstack ${isVisible ? 'element-visible' : 'element-hidden'}`}>
            {stackItems.map((item, index) => (
                <span 
                    key={index} 
                    style={{ 
                        display: 'inline-block' 
                    }}
                    className="stack-link"
                >
                    <FontAwesomeIcon icon={item.icon} />
                </span>
            ))}
        </div>
    );
}

export default MainStack;