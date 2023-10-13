import "./tag-button.scss";

interface Props {
	buttonText: string;
	className?: string;
	isNotified?: boolean;
	isActive?: boolean;
	click: () => void;
}

export default function TagButton({ buttonText, className = "", isNotified = false, isActive = true, click }: Props) {
	return (
		<button
			className={`tag_button ${className} ${isActive ? "button__active" : ""} ${isNotified ? "notified" : ""}`}
			onClick={click}
		>
			<span className="button__text">{buttonText}</span>
			{isNotified && <div className="red__dot" />}
		</button>
	);
}
