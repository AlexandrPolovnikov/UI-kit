import { CSSProperties, useRef, useState } from "react";
import "./password-input.scss";
import StageComponents from "../../helpers/stage-components";

import Open from "./images/Open";
import Close from "./images/Close";

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
			className={`input__container ${classNameContainer} ${isDisabled ? "disabled__component" : ""} row ${[
				StageComponents(stage).class,
			]}`}
		>
			<div
				className={`input__wrapper column`}
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
					className={`input ${className}`}
					onChange={(event) => changeEvent(event.target.value)}
				/>
				{label && <p className={`label ${textValue ? "active__label" : ""}`}>{label}</p>}
				<div className="image__container">
					{isShow ? (
						<div onClick={() => setIsShow(!isShow)}>
							<Open />
						</div>
					) : (
						<div onClick={() => setIsShow(!isShow)}>
							<Close />
						</div>
					)}
				</div>
			</div>

			<div className={`bottom__block column`}>
				<div className={`stage column`}>
					<p>{StageComponents(stage).svg}</p>
					<p className="text">{StageComponents(stage).text}</p>
				</div>
				{buttonText && buttonFunction && (
					<p
						onClick={buttonFunction}
						className={`repeat`}
					>
						{buttonText}
					</p>
				)}
			</div>
		</div>
	);
}
