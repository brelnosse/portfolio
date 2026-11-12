import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//@ts-ignore
import '../assets/style/alert.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { use, useEffect } from 'react';

const Alert:React.FC<{type: string; title: string; description: string; isAlertVisible: boolean; setIsAlertVisible: (v:boolean) => void}> = ({type, title, description, isAlertVisible, setIsAlertVisible}) =>{
    useEffect(() => {
        if (isAlertVisible) {
            const timer = setTimeout(() => {
                setIsAlertVisible(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isAlertVisible, setIsAlertVisible]);


    return (
        <div className={`alert ${type} ${isAlertVisible ? 'show':'hide'}`}>
            <span className="progressBar"></span>
            <h1>
                {type === 'error' ? <FontAwesomeIcon icon={fas.faExclamationCircle}/> :
                type === 'success' ? <FontAwesomeIcon icon={fas.faCheckCircle}/>:
                type === 'info' ? <FontAwesomeIcon icon={fas.faInfoCircle}/> : <FontAwesomeIcon icon={fas.faExclamationTriangle}/>}
                {title}
            </h1>
            <p>{description}</p>
            <div className="act-btns-container">
                <button 
                    className="close-alert"
                    onClick={()=>{
                        setIsAlertVisible(false)
                    }}>
                        {type === 'success' ? <FontAwesomeIcon icon={fas.faCheckCircle}/> :
                        type === 'error' ? <FontAwesomeIcon icon={fas.faExclamationCircle}/>:
                        type === 'info' ? <FontAwesomeIcon icon={fas.faInfoCircle}/> : <FontAwesomeIcon icon={fas.faExclamationTriangle}/>}
                        Ok
                    </button>
            </div>
        </div>
    );
}
export default Alert;