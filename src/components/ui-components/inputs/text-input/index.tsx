import { CSSProperties, useRef } from "react";
import classes from "./text-input.module.scss";

import StageComponents from "~/helpers/stage-components";

interface textInputI {
	textValue?: string;
	changeEvent: (value: string) => void;
	label?: string;
	className?: string;
	classNameLabel?: string;
	classNameContainer?: string;
	holder?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	styles?: CSSProperties;
	stage?: "loading" | "normal" | "warning" | "error" | "success";
	classNameInput?: string;
	stageText?: string;
}

export default function TextInput({
	textValue,
	changeEvent,
	label,
	classNameLabel,
	holder,
	isDisabled,
	styles,
	className,
	classNameContainer,
	classNameInput,
	stage = "normal",
	stageText,
}: textInputI) {
	const ref = useRef<HTMLInputElement | null>(null);
	return (
		<div
			className={`${classes.input__container} ${classNameContainer} ${isDisabled ? classes.disabled__component : ""} row ${
				classes[StageComponents(stage).class]
			} ${stage === "normal" ? classes.without__stage : ""}`}
		>
			<div
				className={`${classes.input__wrapper} ${classNameInput}`}
				onClick={() => {
					if (!ref.current) return;
					ref.current.focus();
				}}
			>
				<input
					ref={ref}
					type="text"
					value={textValue}
					placeholder={holder}
					disabled={isDisabled}
					style={{ ...styles }}
					className={`${classes.input} ${className}`}
					onChange={(event) => changeEvent(event.target.value)}
				/>
				{label && <p className={`${classes.label} ${textValue ? classes.active__label : ""}`}>{label}</p>}
			</div>

			<div className={`${classes.stage} column`}>
				<p>{StageComponents(stage).svg}</p>
				<p className={`${classes.text}`}>{stageText ? stageText : StageComponents(stage).text}</p>
			</div>
		</div>
	);
}
