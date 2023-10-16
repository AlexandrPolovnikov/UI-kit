import classes from "./tooltip.module.scss";

interface Props {
	text: string;
	position?:
		| "none"
		| "right-center"
		| "right-top"
		| "right-bottom"
		| "left-center"
		| "left-top"
		| "left-bottom"
		| "bottom-center"
		| "bottom-left"
		| "bottom-right"
		| "top-center"
		| "top-left"
		| "top-right";
}
export default function Tooltip({ text, position = "none" }: Props) {
	return (
		<div className={`${classes.container} ${classes[position]}`}>
			<div className={`${classes.tooltip}`}>
				<span className={`${classes.tooltip__text}`}>{text}</span>
			</div>
			<div className={`${classes.triangle} ${classes[position]}`}></div>
		</div>
	);
}
