import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEventHandler } from "react";

import classes from "./delete-popup.module.scss";
import CloseImage from "~/public/assets/close.svg";
import PlainButton from "~/components/ui-components/buttons/plain-button";

type Props = {
	title: string;
	onClose: () => void;
	onDelete: () => void;
	description: string;
};

const DeletePopup = (props: Props) => {
	const { title, onClose, description, onDelete } = props;
	const rootRef = useRef<HTMLDivElement>(null);
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		const handleWrapperClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && rootRef.current === target) {
				onClose?.();
			}
		};
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose?.();
			}
		};

		window.addEventListener("click", handleWrapperClick);
		window.addEventListener("keydown", handleEscapePress);

		return () => {
			window.removeEventListener("click", handleWrapperClick);
			window.removeEventListener("keydown", handleEscapePress);
		};
	}, [onClose]);

	const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = useCallback(() => {
		onClose?.();
	}, [onClose]);

	return (
		<div
			className={classes.wrapper__modal}
			ref={rootRef}
		>
			<div
				className={classes.content}
				data-testid="wrap"
			>
				<div className={classes.wrapper__title}>
					<p className={classes.title}>{title}</p>
				</div>
				<div
					onClick={handleClose}
					className={classes.closeImage}
				>
					<CloseImage />
				</div>
				<p className={classes.description}>{description}</p>
				<div className={classes.wrapper__trigger}>
					<PlainButton
						className={classes.button}
						buttonText="Да"
						clickEvent={() => {
							onDelete();
							onClose();
						}}
						buttonSize="large"
					/>
					<PlainButton
						className={classes.button}
						buttonText="Отмена"
						clickEvent={() => onClose()}
						buttonSize="large"
						colorType="secondary"
					/>
				</div>
			</div>
		</div>
	);
};

export default DeletePopup;
