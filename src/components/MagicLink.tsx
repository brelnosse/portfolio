import { Link } from "react-router-dom";
//@ts-ignore
import '../assets/style/magicLink.css';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MagicLink:React.FC<{path: string; text: string}> = ({path, text}) => {
    return (
        <Link to={path} target='_blank' className="mLink">
            {text}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{fontSize: '8px', position: 'absolute', top: '2px', right: '-10px'}}/>
        </Link>
    );
}
export default MagicLink;