import classes from "./checkbox-input.module.scss";

interface Props {
	isActive: boolean;
	changeEvent: () => void;
	activeColor?: string;
	offColor?: string;
	borderColor?: string;
	borderColorHover?: string;
	size?: string;
	fillColor?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	label?: string;
	className?: string;
	classNameLabel?: string;
}

const CheckboxInput = ({
	isActive,
	changeEvent,
	activeColor = classes.square__color__active,
	offColor = classes.square__color__off,
	borderColor = classes.border__color,
	borderColorHover = classes.border__hover,
	size = "medium",
	fillColor = "#fff",
	isDisabled = false,
	isRequired = false,
	label,
	className,
	classNameLabel,
}: Props) => {
	let fillColorValue = fillColor;
	if (isDisabled) {
		isActive ? (fillColorValue = "#7AA7FF") : (fillColorValue = "#F7F7FD");
	}

	return (
		<div className={`${classes.input__container} ${className} ${isDisabled ? classes.disabled__component : ""} column`}>
			<div
				className={`
					${classes.square}	
					${isActive ? activeColor : offColor && borderColor}
					${borderColorHover}
					${classes[size]}			
					center-content
				`}
				tabIndex={0}
				onClick={(event) => {
					event.stopPropagation();
					if (isDisabled) return;
					changeEvent?.();
				}}
			>
				<svg
					width={size === "medium" ? "13" : size === "small" ? "10" : "16"}
					height={size === "large" ? "16" : "11"}
					viewBox="0 0 13 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 5.91475L4.45177 10.375L13 1.83524L11.7728 0.624969L4.45177 7.93747L1.21024 4.69596L0 5.91475Z"
						fill={fillColorValue}
						// fill={!isDisabled ?	(isActive ? fillColor : 'transparent') : isActive ? '#5637CC' : 'transparent'}
					/>
				</svg>
			</div>
			{label && (
				<p
					className={`${classes.label__element} ${classNameLabel}`}
					onClick={() => !isDisabled && changeEvent?.()}
				>
					{label} {isRequired && <span className={`${classes.span__element}`}>*</span>}
				</p>
			)}
		</div>
	);
};

export default CheckboxInput;
