import classes from "./text-input-with-icon.module.scss";
import { ReactNode } from "react";

interface Props {
	textValue: string;
	changeEvent: (value: string) => void;
	className?: string;
	holder?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	icon: ReactNode;
	iconStart?: boolean;
}

export default function TextInputWithIcon ({
	textValue,
	changeEvent,
	holder,
	isDisabled,
	className,
	icon,
	iconStart
}:Props) {
	return (
		<div className={`${classes.input__container} ${className} column`}>
			{iconStart && <div className={`${classes.search}`}>
				{icon}
			</div>}
			<input
				type="text"
				value={textValue}
				placeholder={holder}
				disabled={isDisabled}
				className={`${classes.input} ${className}`}
				onChange={(event) => changeEvent(event.target.value)}
			/>
			{!iconStart && <div className={`${classes.search}`}>
				{icon}
			</div>}
		</div>
	);
};


