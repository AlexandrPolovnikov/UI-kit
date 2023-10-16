import { Calendar as ACalendar, ConfigProvider, Select } from "antd";
import React, { ComponentProps, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import locale from "antd/locale/ru_RU";
import dayjs from "dayjs";
import Left from "~/public/assets/left_circle.svg";
import Right from "~/public/assets/right_circle.svg";
import dayLocaleData from "dayjs/plugin/localeData";
import "dayjs/locale/ru";
import classes from "./calendar.module.scss";
import { CalendarMode } from "antd/es/calendar/generateCalendar";

type CalendarProps = ComponentProps<typeof ACalendar>;
dayjs.extend(dayLocaleData);

type CustomProps = {
	onChangeDate: Dispatch<SetStateAction<string | undefined>>;
	onClose: () => void;
};

const month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const DataPicker: FC<CalendarProps & CustomProps> = (props) => {
	const [currentMonth, setCurrentMonth] = useState<number>(0);

	useEffect(() => {
		setCurrentMonth(!!props.value ? dayjs(props.value).month() : new Date().getUTCMonth());
	}, [props.value]);

	const renderHeader = (
		value: dayjs.Dayjs,
		type: string,
		onChange: {
			(date: dayjs.Dayjs): void;
			(arg0: any): void;
		},
		onTypeChange: (type: CalendarMode) => void,
	) => {
		const localeData = dayjs(value).localeData();
		const year = dayjs(value).year();
		const options = [];
		for (let i = year - 10; i < year + 10; i += 1) {
			options.push(
				<Select.Option
					key={i}
					value={i}
					className="year-item"
					id="year_select"
				>
					{i}
				</Select.Option>,
			);
		}

		return (
			<div>
				<div className={classes.wrapper_calendar_year}>
					<Select
						size="small"
						className={classes.selector}
						value={year}
						onChange={(newYear) => {
							const now = value.clone().year(newYear);
							onChange(now);
						}}
					>
						{options}
					</Select>
				</div>
				<div className={classes.wrapper_calendar_month}>
					<button
						className={classes.icon}
						onClick={() => (currentMonth !== 0 ? setCurrentMonth((init) => init - 1) : null)}
					>
						<Left className={currentMonth !== 0 ? "" : classes.disabled} />
					</button>
					<p className={classes.month}>{month[currentMonth]}</p>
					<button
						className={classes.icon}
						onClick={() => (currentMonth !== 11 ? setCurrentMonth((init) => init + 1) : null)}
					>
						<Right className={currentMonth !== 11 ? "" : classes.disabled} />
					</button>
				</div>
			</div>
		);
	};

	const onSelectDate = (date: any) => {
		if (props.onChangeDate) {
			props.onChangeDate(date.$d);
		}
	};

	return (
		<ConfigProvider locale={locale}>
			<div
				className={classes.wrapper_calendar}
				id="datePicker"
			>
				<ACalendar
					value={props.value}
					onChange={onSelectDate}
					className={classes.calendar}
					fullscreen={false}
					headerRender={({ value, type, onChange, onTypeChange }) => renderHeader(value, type, onChange, onTypeChange)}
					{...props}
				/>
			</div>
		</ConfigProvider>
	);
};

export default React.memo(DataPicker);
