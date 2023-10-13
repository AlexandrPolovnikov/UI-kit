import "./radio-input.scss";

interface Props {
	isActive?: boolean;
	changeEvent?: () => void;
	label?: string;
	size?: "small" | "medium" | "large";
	borderSize?: "thin" | "thick";
	circleColorBorder?: string;
	switchColor?: string;
	isDisabled?: boolean;
	className?: string;
	labelClass?: string;
}

export default function RadioInput({
	isActive,
	changeEvent,
	label,
	size = "small",
	borderSize = "thin",
	circleColorBorder = "circle__border__color__default",
	switchColor = "switch__color__default",
	isDisabled = false,
	className,
	labelClass,
}: Props) {
	return (
		<div
			onClick={() => !isDisabled && changeEvent?.()}
			className={`circle__container ${className} horizontal-center-items column`}
		>
			<div
				className={`
                circle
                ${[size]}
                ${[borderSize]}  
                ${!isDisabled ? circleColorBorder : "circle__border__disable"}                                        
                `}
				tabIndex={0}
			>
				<div
					className={`
                    switch
                    ${[size]}
                    ${!isDisabled && isActive ? switchColor : ""}
                    ${isDisabled && isActive ? "switch__disable" : ""}
                `}
				/>
			</div>
			{label && <span className={`label ${labelClass}`}>{label}</span>}
		</div>
	);
}
