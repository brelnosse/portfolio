//@ts-ignore
import '../assets/style/pageloader.css';

const PageLoader:React.FC = () =>{
    return (
        <div className="page-loader_container">
            <div className="loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
}
export default PageLoader;