import { useMemo, useState } from "react";

import classes from "./drop-menu.module.scss";
import Arrow from "./images/arrow.svg";
import StageComponents from "~/helpers/stage-components";

interface Props {
	activeIndex: number | null;
	elements: string[];
	changeEvent: (arg: number | null) => void;
	label?: string;
	className?: string;
	classNameDropMenu?: string;
	classNameSelected?: string;
	classNameOption?: string;
	isDisabled?: boolean;
	noneSelectedText?: string;
	isNoneSelected?: boolean;
	isRequired?: boolean;
	holder?: string;
	stage?: string;
	stageText?: string;
}

export default function DropMenu({
	activeIndex,
	elements,
	changeEvent,
	label = "",
	className = "",
	classNameDropMenu = "",
	classNameSelected = "",
	classNameOption = "text-black",
	isDisabled = false,
	noneSelectedText = "Ничего не выбрано",
	isNoneSelected = false,
	isRequired = false,
	holder,
	stage = "normal",
	stageText,
}: Props) {
	const [isToggled, setIsToggled] = useState(false);

	const tempElements: string[] = useMemo(() => {
		if (isNoneSelected) {
			return [noneSelectedText, ...elements];
		}
		return elements;
	}, [isNoneSelected, elements]);

	const handleSelect = (value: number) => {
		if (value === 0 && isNoneSelected) {
			changeEvent(null);
			return;
		}
		changeEvent(isNoneSelected ? value - 1 : value);
	};

	const handleText = useMemo(() => {
		if (activeIndex === null) return holder;
		if (isNoneSelected) return tempElements[activeIndex + 1];
		return tempElements[activeIndex];
	}, [activeIndex]);

	const toggleMenu = () => {
		if (elements.length === 0) return;
		if (isDisabled) return;
		setIsToggled(!isToggled);
	};

	return (
		<div
			className={`${classes.drop__menu} ${className} ${isDisabled ? classes.disabled__component : ""} row ${
				classes[StageComponents(stage).class]
			} ${stage === "normal" ? classes.empty : ""}`}
		>
			<div
				tabIndex={0}
				onClick={toggleMenu}
				onBlur={() => setIsToggled(false)}
				className={`${classes.drop__menu__main} ${classNameDropMenu} ${isToggled && !isDisabled ? classes.active : ""}`}
			>
				<div className={`${classes.drop__menu___selected} ${classNameSelected} column`}>
					<span className={`block__regular-text text-black end-text ${classes.text}`}>{handleText}</span>
					<div className={`${classes.arrow} ${isToggled ? classes.arrow__active : ""}`}>
						<Arrow />
					</div>
					{label && <p className={`${classes.label} ${activeIndex !== null ? classes.active__label : ""}`}>{label}</p>}
				</div>
				<div className={`${classes.drop__menu__options} ${isToggled && !isDisabled ? classes.open : ""}`}>
					{tempElements.map((element, index) => {
						return (
							<p
								key={index}
								onClick={() => handleSelect(index)}
								className={`${classes.option} ${classNameOption}`}
							>
								{element}
							</p>
						);
					})}
				</div>
			</div>
			<div className={`${classes.stage} column`}>
				<p>{StageComponents(stage).svg}</p>
				<p className={`${classes.text}`}>{stageText ? stageText : StageComponents(stage).text}</p>
			</div>
		</div>
	);
}
