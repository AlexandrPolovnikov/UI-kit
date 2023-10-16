import { forwardRef, useEffect, ReactNode, useState, useRef, TouchEvent } from "react";
import { useAppSelector } from "~/store/hooks";
import { selectNavigation } from "~/store/reducers/navigation.slice";
import { handlerHide, handlerShow } from "~/utils/body-flow";

import classes from "./popup.module.scss";
// import Arrow from "~/public/assets/arrow.svg";
import Close from "~/public/assets/close.svg";

interface Props {
    closeEvent: (arg: boolean | null) => void;
    children?: ReactNode;
    isShown: boolean | null;
    className?: string;
    classNameContent?: string;
    classNameContentMain?: string;
    classNameTitle?: string;
    title?: string;
}

export const Popup = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const refContent = useRef<HTMLDivElement | null>(null);
    const { width } = useAppSelector(selectNavigation);
    const {
        closeEvent,
        children,
        isShown,
        className,
        classNameContent,
        classNameContentMain,
        classNameTitle,
        title,
    } = props;
    const [localIsShown, setLocalIsShown] = useState<boolean | null>(false);

    const [translateY, setTranslateY] = useState<string>("");
    const [transitionTime, setTransitionTime] = useState<string>("0.5");

    useEffect(() => {
        handlerShow();
        return () => {
            handlerHide();
            setLocalIsShown(false);
        };
    }, []);

    useEffect(() => {
        setLocalIsShown(isShown);
        if (isShown === false) {
            setTimeout(() => closeEvent(null), 500);
        }
    }, [isShown]);

    const handleTouch = (event: TouchEvent) => {
        if (!refContent.current) return;
        if (event.touches[0].clientY - refContent.current.offsetTop < 0) return;
        setTranslateY(`${event.touches[0].clientY - refContent.current.offsetTop}px`);
        setTransitionTime("0");
    };

    const handleTouchEnd = (event: TouchEvent) => {
        if (!refContent.current) return;
        if (event.changedTouches[0].clientY - refContent.current.offsetTop < 150) {
            setTranslateY("0%");
            setTransitionTime("0.5");
            return;
        }
        setTranslateY("100%");
        setTransitionTime("0.5");
        closeEvent(false);
        // setTimeout(() => {
        //     closeEvent(null);
        // }, 500);
    };

    const handleClose = () => {
        if (width !== null && width <= 1050) setTranslateY("100%");
        closeEvent(false);
        // setTimeout(() => {
        //     closeEvent(null);
        // }, 500);
    };

    return (
        <div
            ref={ref}
            className={`${classes.wrapper__fixed} ${
                localIsShown ? classes.wrapper__active : ""
            } ${className}`}>
            <div
                ref={refContent}
                className={`${classes.wrapper__content} ${
                    localIsShown ? classes.active : ""
                } ${classNameContent} row`}
                style={{
                    transform: `translateY(${translateY})`,
                    transitionDuration: `${transitionTime}s`,
                }}>
                <div
                    onTouchMove={handleTouch}
                    onTouchEnd={handleTouchEnd}
                    className={`${classes.drag__container}`}>
                    {/* <div className={classes.drag__line} /> */}
                </div>
                <div onClick={handleClose} className={`${classes.close}`}>
                    <Close />
                </div>
                <div className={`${classes.content__main} ${classNameContentMain} row`}>
                    {title ? (
                        <p className={`${classes.popup__title} ${classNameTitle} font-bold`}>
                            {title}
                        </p>
                    ) : null}
                    {children}
                </div>
            </div>
        </div>
    );
});

Popup.displayName = "Popup";

export default Popup;
