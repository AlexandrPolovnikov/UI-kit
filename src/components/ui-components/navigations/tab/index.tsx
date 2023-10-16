import classes from "./tab.module.scss";
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Tab {
	title: string;
	content: ReactNode | string;
}

interface Props {
	tabs?: Tab[];
	selectedTab?: number;
	defaultTab?: number;
	disabledTabs?: number[];
}

export default function Tabs({ tabs = [], defaultTab = 0, selectedTab, disabledTabs = [] }: Props) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState(selectedTab ? selectedTab : defaultTab);

	const selectTab = (selectedTab: number) => {
		setActiveTab(selectedTab);
	};

	if (!tabs.length) return null;

	return (
		<div>
			{tabs.map((tab: Tab, index: number) => (
				<div
					className={classes.tabs__contain__link}
					key={`${index}`}
				>
					<button
						className={`${classes.tab__link} ${index === activeTab ? classes.tab__active : ""}`}
						onClick={() => selectTab(index)}
						disabled={!!disabledTabs.includes(index)}
					>
						<Link href={`#${router.pathname}/${tab.title}`}>{tab.title}</Link>
					</button>
				</div>
			))}
			<div
				id={`${router.pathname}/${tabs[activeTab].title}`}
				className={classes.tabContent}
			>
				{tabs[activeTab].content}
			</div>
		</div>
	);
}
