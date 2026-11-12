export interface TabNavigationprops {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
export type TabProps = {
    value: string;
    activeTab ?: string;
    isSelected: (tab: string) => string;
    setActiveTab: (tab: string) => void;
};
