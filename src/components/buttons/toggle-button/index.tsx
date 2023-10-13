import "./toggle-button.scss";

interface Props {
	label?: string;
	labelDirection?: "left" | "right";
	className?: string;
	classNameTumbler?: string;
	classNameLabel?: string;
	clickEvent: () => void;
	isActive: boolean;
	isDisabled?: boolean;
}

export default function ToggleButton({
	label = "",
	labelDirection = "right",
	className = "",
	classNameTumbler,
	classNameLabel,
	clickEvent,
	isActive = false,
	isDisabled = false,
}: Props) {
	return (
		<div
			className={`toggle__button ${label ? "with__label" : ""} ${isDisabled ? "disabled" : ""} ${className} `}
			onClick={() => {
				if (isDisabled) return;
				clickEvent?.();
			}}
			aria-disabled={isDisabled}
		>
			{label && labelDirection === "left" && <p className={`${classNameLabel}`}>{label}</p>}
			<div
				tabIndex={0}
				className={`toggle__tumbler ${classNameTumbler} ${isActive ? "toggle__tumbler___active" : ""}`}
			>
				<div className={`circle`} />
			</div>
			{label && labelDirection === "right" && <p className={`${classNameLabel}`}>{label}</p>}
		</div>
	);
}
