import { CSSProperties, ReactNode, useRef } from "react";
import "./search-input.scss";

interface textInputI {
	textValue?: string;
	changeEvent: (value: string) => void;
	label: string;
	className?: string;
	classNameLabel?: string;
	classNameContainer?: string;
	holder?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	styles?: CSSProperties;
	classNameInput?: string;
	stageText?: string;
	icon?: ReactNode;
}

export default function SearchInput({
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
	stageText,
	icon,
}: textInputI) {
	const ref = useRef<HTMLInputElement | null>(null);
	return (
		<div className={`input__container ${classNameContainer} ${isDisabled ? "disabled__component" : ""} row`}>
			<div
				className={`input__wrapper ${classNameInput}`}
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
					className={`input ${className}`}
					onChange={(event) => changeEvent(event.target.value)}
				/>
				{!textValue && (
					<div className={`wrapper__icon column`}>
						<p className={`label ${textValue ? "active__label" : ""}`}>{label}</p>
						{icon}
					</div>
				)}

				{textValue && (
					<div
						onClick={() => {
							changeEvent(``);
						}}
						className={`clear`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M13.2374 11.6464L12.8837 12.0001L13.2375 12.3537L17.6933 16.8067C17.6933 16.8067 17.6934 16.8067 17.6934 16.8068C17.8109 16.9243 17.8769 17.0838 17.8769 17.25C17.8769 17.4163 17.8109 17.5757 17.6933 17.6933C17.5757 17.8109 17.4163 17.8769 17.25 17.8769C17.0837 17.8769 16.9243 17.8109 16.8067 17.6933L12.3536 13.2402L12 12.8866L11.6464 13.2402L7.19332 17.6933L7.54687 18.0469L7.19332 17.6933C7.07574 17.8109 6.91628 17.8769 6.75 17.8769C6.58372 17.8769 6.42425 17.8109 6.30668 17.6933C6.1891 17.5757 6.12305 17.4163 6.12305 17.25C6.12305 17.0837 6.1891 16.9243 6.30668 16.8067L10.7598 12.3536L11.1134 12L10.7598 11.6464L6.30668 7.19332C6.1891 7.07574 6.12305 6.91628 6.12305 6.75C6.12305 6.58372 6.1891 6.42425 6.30668 6.30668C6.42425 6.1891 6.58372 6.12305 6.75 6.12305C6.91628 6.12305 7.07574 6.1891 7.19332 6.30668L11.6464 10.7598L12 11.1134L12.3536 10.7598L16.8064 6.30699C16.8064 6.30692 16.8065 6.30685 16.8066 6.30678C16.924 6.18962 17.0832 6.12389 17.2491 6.12404C17.4152 6.12419 17.5743 6.19028 17.6916 6.30777C17.8089 6.42526 17.8747 6.58454 17.8745 6.75055C17.8744 6.91657 17.8083 7.07572 17.6908 7.19301L17.6905 7.19332L13.2374 11.6464Z"
								fill="#B8B8B8"
								stroke="#B8B8B8"
							/>
						</svg>
					</div>
				)}
			</div>
		</div>
	);
}
