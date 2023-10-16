import classes from "./radio-input.module.scss";

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
    circleColorBorder = classes.circle__border__color__default,
    switchColor = classes.switch__color__default,
    isDisabled = false,
    className,
    labelClass,
}: Props) {
    return (
        <div
            onClick={() => !isDisabled && changeEvent?.()}
            className={`${classes.circle__container} ${className} horizontal-center-items column`}>
            <div
                className={`
                ${classes.circle}
                ${classes[size]}
                ${classes[borderSize]}  
                ${
                    !isDisabled ? circleColorBorder : classes.circle__border__disable
                }                                        
                `}
                tabIndex={0}>
                <div
                    className={`
                    ${classes.switch}
                    ${classes[size]}
                    ${!isDisabled && isActive ? switchColor : ""}
                    ${isDisabled && isActive ? classes.switch__disable : ""}
                `}
                />
            </div>
            {label && <span className={`${classes.label} ${labelClass}`}>{label}</span>}
        </div>
    );
}
