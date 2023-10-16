import { ChangeEvent, useEffect, useState } from "react";

import classes from "./multiple-range-slider.module.scss";

import EventHelper from "~/helpers/event.helper";
const eventHelper = new EventHelper();

interface Props {
	min: number;
	max: number;
	value?: { min: number; max: number };
	defaultValue?: { min: number; max: number };
	step: number;
	onChange: (value: number[]) => void;
	minName?: string;
	maxName?: string;
	classNameContainer?: string;
	label?: string;
	fixedSymbols?: number;
}

export default function MultipleRangeSlider({
	min,
	max,
	value,
	defaultValue,
	step,
	onChange,
	minName,
	maxName,
	classNameContainer,
	label = "",
	fixedSymbols = 0,
}: Props) {
	const [minValue, setMinValue] = useState<number>(defaultValue ? defaultValue.min : min);
	const [maxValue, setMaxValue] = useState<number>(defaultValue ? defaultValue.max : max);

	useEffect(() => {
		if (value) {
			setMinValue(value.min);
			setMaxValue(value.max);
		}
	}, [value]);

	const converter = (value: number) => {
		return Number(value.toFixed(fixedSymbols));
	};

	const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const thisMinVal = Math.min(+event.target.value, maxValue - step);
		if (thisMinVal < min) {
			setMinValue(converter(min));
			eventHelper.debounce(() => {
				onChange([converter(min), maxValue]);
			}, 100);
			return;
		}
		if (parseFloat(event.target.value) > max) {
			setMinValue(converter(maxValue - step));
			eventHelper.debounce(() => {
				onChange([converter(maxValue - step), maxValue]);
			}, 100);
			return;
		}
		setMinValue(converter(thisMinVal));
		eventHelper.debounce(() => {
			onChange([converter(thisMinVal), maxValue]);
		}, 100);
	};

	const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const thisMaxVal = Math.max(+event.target.value, minValue + step);
		if (thisMaxVal > max) {
			setMaxValue(converter(max));
			onChange([minValue, converter(max)]);
			return;
		}
		setMaxValue(converter(thisMaxVal));
		eventHelper.debounce(() => {
			onChange([minValue, converter(thisMaxVal)]);
		}, 100);
	};

	const minPos = ((minValue - min) / (max - min)) * 100;
	const maxPos = ((maxValue - min) / (max - min)) * 100;

	return (
		<div className={`${classes.multiple__range} row`}>
			<p className={`${classes.label} text-xs`}>{label}</p>
			<div className={`${classes.container} ${classNameContainer || ""}`}>
				<div className={classes.wrapper}>
					<div className={classes.inputWrapper}>
						<input
							className={classes.input}
							type="range"
							value={minValue}
							min={min}
							max={max}
							step={step}
							onChange={handleMinChange}
							name={minName}
							aria-label="min"
						/>
						<input
							className={classes.input}
							type="range"
							value={maxValue}
							min={min}
							max={max}
							step={step}
							onChange={handleMaxChange}
							name={maxName}
							aria-label="max"
						/>
					</div>
					<div className={classes.controlWrapper}>
						<div
							className={classes.control}
							style={{ left: `calc(${minPos < 0 ? 0 : minPos}%)` }}
						/>
						<div className={classes.rail}>
							<div
								className={classes.innerRail}
								style={{
									left: `${minPos < 0 ? 0 : minPos}%`,
									right: `${100 - maxPos < 0 ? 0 : 100 - maxPos}%`,
								}}
							/>
						</div>
						<div
							className={classes.control}
							style={{ left: `calc(${maxPos > 100 ? 100 : maxPos}%)` }}
						/>
					</div>
				</div>
			</div>
			<div className={classes.numbers}>
				<input
					className={`block__regular__text-18`}
					type={"number"}
					min={min}
					max={max}
					step={step}
					value={minValue}
					onChange={handleMinChange}
					tabIndex={-1}
				/>
				<input
					className={`block__regular__text-18 end-text`}
					type={"number"}
					min={min}
					max={max}
					step={step}
					value={maxValue}
					onChange={handleMaxChange}
					tabIndex={-1}
				/>
			</div>
		</div>
	);
}
