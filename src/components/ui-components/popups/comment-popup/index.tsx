import { useEffect, useState } from "react";
import { handlerHide, handlerShow } from "~/utils/body-flow";

import classes from "./comment-popup.module.scss";
import Close from "~/public/assets/close.svg";
import PlainButton from "~/components/ui-components/buttons/plain-button";

import { PopupCommentI } from "~/helpers/interfaces/popup";

interface Props extends PopupCommentI {
	isShown: boolean | null;
	clearEvent?: (arg: string) => void;
	closeEvent: (arg: boolean | null) => void;
}

export default function CommentPopup({ title = "Комментарий администратора", comment, isShown, clearEvent, closeEvent }: Props) {
	const [localIsShown, setLocalIsShown] = useState<boolean | null>(false);

	useEffect(() => {
		handlerHide();
		return () => {
			handlerShow();
			clearEvent?.("");
			setLocalIsShown(false);
		};
	}, []);

	useEffect(() => {
		setLocalIsShown(isShown);
		if (isShown === false) {
			setTimeout(() => closeEvent(null), 500);
		}
	}, [isShown]);

	return (
		<div className={`${classes.comment} ${localIsShown ? classes.active : ""} wrapper__fixed`}>
			<div className={`${classes.comment__content} row`}>
				<div
					onClick={(event) => {
						event.stopPropagation();
						closeEvent(false);
					}}
					className={`${classes.close} pointer`}
				>
					<Close />
				</div>
				<div className={`${classes.content__texts} row`}>
					<p className={"main-screen__header-2 font-bold"}>{title}</p>
					<p className={"text-base"}>{comment}</p>
				</div>
				<PlainButton
					buttonText={"Ок"}
					buttonSize={"large"}
					className={`${classes.button}`}
					clickEvent={() => closeEvent(false)}
				/>
			</div>
		</div>
	);
}
