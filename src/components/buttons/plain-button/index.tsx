import React from "react";
import { ReactNode } from "react";

import "./plain-button.scss";
type ColorsType = "primary" | "secondary" | "tertiary" | "quaternary" | "quinary";
type ButtonSize = "large" | "normal" | "medium" | "small" | "extraSmall";
type Type = "submit" | "reset" | "button";

interface Props {
	colorType?: ColorsType;
	buttonSize?: ButtonSize;
	className?: string;
	clickEvent?: () => void;
	type?: Type;
	buttonText?: string;
	svgIcon?: ReactNode;
	position?: "left" | "right";
	isDisabled?: boolean;
}

export default function PlainButton({
	colorType = "primary",
	buttonSize = "normal",
	className = "",
	clickEvent,
	type = "button",
	buttonText,
	svgIcon,
	position,
	isDisabled = false,
}: Props) {
	return (
		<button
			type={type}
			onClick={(event) => {
				clickEvent?.();
				event.stopPropagation();
				if (type === "submit") event.preventDefault();
			}}
			disabled={isDisabled}
			className={`plain__button ${[colorType]} ${[buttonSize]} ${className} ${svgIcon && buttonText ? "with__icon" : ""} `}
		>
			{svgIcon && position === "left" && svgIcon}
			{buttonText || svgIcon}
			{svgIcon && position === "right" && svgIcon}
		</button>
	);
}
