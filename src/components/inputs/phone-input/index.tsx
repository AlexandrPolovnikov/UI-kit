import "./phone-input.scss";

import { useEffect, useRef, useState } from "react";

import StringUtils from "../../utils/string.utils";
import StageComponents from "../../helpers/stage-components";

const { phonePrettierWithCode } = new StringUtils();

interface Props {
	changeEvent: (arg: string) => void;
	phoneValue: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	className?: string;
	label?: string;
	textValue?: string;
	stage?: string;
	classNameContainer?: string;
	stageText?: string;
}

export default function PhoneInput({
	changeEvent,
	phoneValue,
	isDisabled,
	isRequired,
	className = "",
	label,
	textValue = "",
	stage = "normal",
	classNameContainer,
	stageText,
}: Props) {
	const [tempValue, setTempValue] = useState("");

	useEffect(() => {
		if (phoneValue === "") {
			setTempValue(`+7`);
			return;
		}
		setTempValue(phonePrettierWithCode(phoneValue));
	}, [phoneValue]);

	const handleChange = (newValue: string) => {
		if (newValue.length === 0) return;
		if (newValue.length > 18) return;
		if (removeCharacters(newValue)[0] !== "7") return;
		changeEvent(removeCharacters(newValue));
	};

	const handleKeyDown = (event: any) => {
		if (event.key === "Backspace") {
			const array = tempValue.split("").reverse();
			if (array.length > 3 || array.length === 0) return;
			// setTempValue('')
		}
	};

	const removeCharacters = (str = "") => {
		return str.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(",", "").replaceAll("+", "");
	};

	const ref = useRef<HTMLInputElement | null>(null);

	return (
		<div
			className={`input__container ${classNameContainer} ${isDisabled ? "disabled__component" : ""} row ${[
				StageComponents(stage).class,
			]}`}
		>
			<div
				className={`input__wrapper`}
				onClick={() => {
					if (!ref.current) return;
					ref.current.focus();
				}}
			>
				<input
					ref={ref}
					value={tempValue}
					type={"text"}
					disabled={isDisabled}
					onChange={(event) => {
						handleChange(event.target.value);
					}}
					className={`input`}
					onKeyDown={handleKeyDown}
				/>
				{label && <p className={`${label} ${phoneValue ? "active__label" : ""}`}>{label}</p>}
			</div>
			<div className={`stage column`}>
				<p>{StageComponents(stage).svg}</p>
				<p className={`text`}>{stageText ? stageText : StageComponents(stage).text}</p>
			</div>
		</div>
	);
}
