import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "../types/button.type";
//@ts-ignore
import '../assets/style/button.css';
import { fas } from "@fortawesome/free-solid-svg-icons";

const Button:React.FC<ButtonProps> = ({type, textStyle, valueIcon, valueText, loading, className, ...props}) =>{
    const classes = ['btn', `btn-${type}`, textStyle, loading ? 'loading' : '', !valueText ? 'icon-only' : '', className]
        .filter(Boolean)
        .join(' ');
    return (
        <button className={classes} {...props} disabled={loading}>
            {loading ? 
                <FontAwesomeIcon icon={fas.faSpinner} spin/> :
                valueIcon && <FontAwesomeIcon icon={valueIcon}/>
            }
            
            {valueText && <span className="btn-text">{valueText}</span>}
        </button>
    );
}
export default Button;