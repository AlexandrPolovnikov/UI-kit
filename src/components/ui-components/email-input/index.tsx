import { CSSProperties, useRef } from "react";
import classes from "./email-input.module.scss";
import StageComponents from "~/helpers/stage-components";

interface Props {
	emailValue?: string;
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
	stageText?: string;
}

export default function EmailInput({
	emailValue,
	changeEvent,
	label,
	classNameLabel,
	holder,
	isDisabled,
	styles,
	className,
	classNameContainer,
	stage = "normal",
	stageText,
}: Props) {
	const ref = useRef<HTMLInputElement | null>(null);

	return (
		<div
			className={`${classes.input__container} ${classNameContainer} ${isDisabled ? classes.disabled__component : ""} row ${
				classes[StageComponents(stage).class]
			}`}
		>
			<div
				className={`${classes.input__wrapper}`}
				onClick={() => {
					if (!ref.current) return;
					ref.current.focus();
				}}
			>
				<input
					ref={ref}
					type="email"
					value={emailValue}
					placeholder={holder}
					disabled={isDisabled}
					style={{ ...styles }}
					className={`${classes.input} ${className}`}
					onChange={(event) => changeEvent(event.target.value)}
				/>
				{label && <p className={`${classes.label} ${emailValue ? classes.active__label : ""}`}>{label}</p>}
			</div>
			<div className={`${classes.stage} column`}>
				<p>{StageComponents(stage).svg}</p>
				<p className={`${classes.text}`}>{stageText ? stageText : StageComponents(stage).text}</p>
			</div>
		</div>
	);
}
