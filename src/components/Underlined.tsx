import { UnderlinedProps } from "../types/underlined.type";
//@ts-ignore
import '../assets/style/underlined.css';

const Underlined:React.FC<UnderlinedProps> = ({text, ...props}) =>{
    return (
        <div className="underlined" {...props}>
            <h2 className="text">{text}</h2>
            <div className="dashed_container">
                <span className="dash small"></span>
                <span className="dash middle"></span>
                <span className="dash"></span>
                <span className="dash"></span>
                <span className="dash middle"></span>
                <span className="dash small"></span>
            </div>
        </div>
    );
} 
export default Underlined;