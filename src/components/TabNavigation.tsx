import { TabNavigationprops, TabProps } from "../types/tabnavigation.types";
//@ts-ignore
import '../assets/style/tabnavigation.css';
import { tabs } from "../data/tabs";

const Tab:React.FC<TabProps> = ({value, isSelected, setActiveTab, ...props}) =>{
    return <span 
                className={`section-navbar_item ${isSelected(value.toLocaleLowerCase().split(' ').join('-'))}`} 
                onClick={()=> {setActiveTab(value.toLocaleLowerCase().split(' ').join('-'));}}
                {...props}>
                    {value}
                </span>;
}
const TabNavigation:React.FC<TabNavigationprops> = ({activeTab, setActiveTab, ...props}) => {
    const isSelected = (tab:string): string => {
        return (activeTab.toLowerCase() === tab) ? 'active' : '';
    }
    return (
        <div className="tab-navigation" {...props}>
            {
                tabs.map((el:string, i:number)=>
                    <Tab value={el} key={el+i} isSelected={isSelected} setActiveTab={setActiveTab}/>
                )
            }
        </div>
    );
}
export default TabNavigation;