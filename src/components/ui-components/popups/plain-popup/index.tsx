import { MutableRefObject, useEffect } from "react";
import { handlerHide, handlerShow } from "~/utils/body-flow";

import classes from "./plain-popup.module.scss";

interface Props {
	children: any;
	containerClassName?: string;
	refer: any;
}

export default function PlainPopup({ children, containerClassName, refer }: Props) {
	useEffect(() => {
		handlerShow();
		return () => handlerHide();
	}, []);

	return (
		<div
			ref={refer}
			className={`${classes.wrapperContainer} center-content`}
		>
			<div className={`${classes.contentContainer} ${containerClassName} row`}>{children}</div>
		</div>
	);
}
