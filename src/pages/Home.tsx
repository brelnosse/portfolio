import { useContext, useState } from 'react';
//@ts-ignore
import '../assets/style/home.css';
import Navbar from '../components/Navbar';
import { Skills } from '../data/skills';
import { skillsResumeItems } from '../data/skillsresumeItems';
import { SkillsCardProps } from '../types/skillscard.type';
import Hero from '../components/Hero';
import SkillResumeContainer from '../components/SkillResumeContainer';
import SkillsContainer from '../components/SkillsContainer';
import CareerContainer from '../components/CareerContainer';
import ExperienceContainer from '../components/ExperienceContainer';
import ProjectContainer from '../components/ProjetContainer';
import About from '../components/About';
import Alert from '../components/Alert';
import { SectionContext } from '../context/SectionContext';
import EasterEgg from '../components/EasterEgg';
import Marquee from '../components/Marquee';
import Footer from '../components/Footer';

const Home:React.FC = () =>{
    const [skillsData, setSkillsData] = useState<SkillsCardProps[]>(Skills);
    const context = useContext(SectionContext)
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [alertDatas, setAlertDatas] = useState<{type: string; title: string; description: string}>({
        type: '',
        title: '',
        description:''
    });
    return (
        <div className="container">
            <Navbar isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} setIsAlertVisible={setIsAlertVisible} setAlertDatas={setAlertDatas}/>
            <Hero isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible}/>
            <Marquee tilt items={['Full-stack', 'Data', 'Python', 'React', 'Node.js', 'Machine Learning', 'Stage avril 2027']}/>
            <About />
            <SkillResumeContainer skillsResumeItems={skillsResumeItems}/>
            <SkillsContainer skillsData={skillsData} setSkillsData={setSkillsData}/>
            <CareerContainer />
            <ExperienceContainer/>
            <Marquee variant='yellow' items={['PrintSpot', 'KmerCoin', 'Vanish', 'Miam', 'ThayiPizza', 'ArchiveX', 'Et ce n’est pas fini']}/>
            <ProjectContainer />
            <Footer onContact={() => setIsFormVisible(true)} />
            <Alert 
                type={alertDatas.type}
                title={alertDatas.title} 
                description={alertDatas.description}
                isAlertVisible={isAlertVisible}
                setIsAlertVisible={setIsAlertVisible}/>
            <EasterEgg />
        </div>
    );
}
export default Home;