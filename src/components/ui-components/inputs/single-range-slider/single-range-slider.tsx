import { ChangeEvent } from 'react';

import classes from './single-range-slider.module.scss';

import StringUtils from "~/utils/string.utils";
const stringUtils = new StringUtils();

interface RangeSliderProps {
    defaultValue: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    name: string;
    label?: string;
    classNameContainer?: string;
    fixedSymbols?: number;
    prettyView?: boolean;
    valueLabel?: string;
}

export default function SingleRangeSlider({
    defaultValue,
    min,
    max,
    step,
    onChange,
    name,
    label = '',
    classNameContainer,
    fixedSymbols = 0,
    prettyView = false,
    valueLabel = ''
}: RangeSliderProps) {

    const converter = (value: number) => {
        return Number(value.toFixed(fixedSymbols));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        if (isNaN(newValue) || newValue < min) {
            onChange(converter(min));
            return;
        }

        if (newValue > max) {
            onChange(converter(max));
            return;
        }
        onChange(converter(newValue));
    };

    return (
        <div className={`${classes.container} ${classNameContainer || ''} row`}>
            {label && <span className={`${classes.label} block__regular__text-14`}>{label}</span>}
            <div className={`${classes.numbers} column`}>
                <input
                    className={`block__regular__text-18 font-bold`}
                    value={defaultValue}
                    onChange={handleInputChange}
                />
                {valueLabel && <p className={`block__regular__text-18`}>{valueLabel}</p>}
            </div>
            <div className={classes.wrapper}>
                <div className={`${classes.inputWrapper} column`}>
                    <input
                        className={classes.input}
                        type='range'
                        value={defaultValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={handleInputChange}
                        name={name}
                    />
                </div>
                <div className={classes.controlWrapper}>
                    <div className={classes.rail}>
                        <div
                            className={classes.innerRail}
                            style={{
                                left: `${0}%`,
                                right: `${((max - defaultValue) / (max - min)) * 100}%`,
                            }}
                        />
                    </div>
                    <div
                        className={`${classes.control} row`}
                        style={{
                            left: `${((defaultValue - min) / (max - min)) * 100}%`,
                        }}
                    ><div className={`${classes.white__circle}`}></div></div>
                </div>
            </div>
        </div>
    );
};
