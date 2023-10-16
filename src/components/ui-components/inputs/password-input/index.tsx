import { CSSProperties, useRef, useState } from "react";
import classes from "./password-input.module.scss";
import StageComponents from "~/helpers/stage-components";

import OpenImage from "./images/open.svg";
import CloseImage from "./images/close.svg";

interface Props {
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
	buttonText?: string;
	buttonFunction?: () => void;
}

export default function PasswordInput({
	textValue,
	changeEvent,
	label,
	classNameLabel,
	holder,
	isDisabled,
	styles,
	className,
	classNameContainer,
	stage = "normal",
	buttonText,
	buttonFunction,
}: Props) {
	const ref = useRef<HTMLInputElement | null>(null);
	const [isShow, setIsShow] = useState(false);
	return (
		<div
			className={`${classes.input__container} ${classNameContainer} ${isDisabled ? classes.disabled__component : ""} row ${
				classes[StageComponents(stage).class]
			}`}
		>
			<div
				className={`${classes.input__wrapper} column`}
				onClick={() => {
					if (!ref.current) return;
					ref.current.focus();
				}}
			>
				<input
					ref={ref}
					type={isShow ? "text" : "password"}
					value={textValue}
					placeholder={holder}
					disabled={isDisabled}
					style={{ ...styles }}
					className={`${classes.input} ${className}`}
					onChange={(event) => changeEvent(event.target.value)}
				/>
				{label && <p className={`${classes.label} ${textValue ? classes.active__label : ""}`}>{label}</p>}
				<div className={`${classes.image__container}`}>
					{isShow ? <OpenImage onClick={() => setIsShow(!isShow)} /> : <CloseImage onClick={() => setIsShow(!isShow)} />}
				</div>
			</div>

			<div className={`${classes.bottom__block} column`}>
				<div className={`${classes.stage} column`}>
					<p>{StageComponents(stage).svg}</p>
					<p className={`${classes.text}`}>{StageComponents(stage).text}</p>
				</div>
				{buttonText && buttonFunction && (
					<p
						onClick={buttonFunction}
						className={`${classes.repeat}`}
					>
						{buttonText}
					</p>
				)}
			</div>
		</div>
	);
}
