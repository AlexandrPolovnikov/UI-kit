import { CSSProperties, useRef } from "react";
import "./number-input.scss";
import StageComponents from "../../helpers/stage-components";

interface numberInputI {
	value?: string;
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

export default function NumberInput({
	value,
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
}: numberInputI) {
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
					type="number"
					value={value}
					placeholder={holder}
					disabled={isDisabled}
					style={{ ...styles }}
					className={`input ${className}`}
					onChange={(event) => changeEvent(event.target.value)}
				/>
				{label && <p className={`label ${value ? "active__label" : ""}`}>{label}</p>}
			</div>

			<div className={`${stage} column`}>
				<p>{StageComponents(stage).svg}</p>
				<p className={`text`}>{stageText ? stageText : StageComponents(stage).text}</p>
			</div>
		</div>
	);
}
