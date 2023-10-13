export default class StringUtils {

	/**
	 * приведение к валидному денежному виду
	 * @param value
	 */
	validMoneyValue(value: string | number) {
		try {
			const cost = String(value);
			const minCostArr = String(cost).split("").reverse();
			if (minCostArr[9]) {
				minCostArr.splice(9, 0, " ");
			}
			if (minCostArr[6]) {
				minCostArr.splice(6, 0, " ");
			}
			if (minCostArr[3]) {
				minCostArr.splice(3, 0, " ");
			}
			return minCostArr.reverse().join("");
		} catch (e) {
			// eslint-disable-next-line
			console.error(e);
			return null;
		}
	}

	phonePrettierWithCode(value = "") {
		const x = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,10})/);
		// @ts-ignore
		let raw = x[0].split('');
		if (value && raw.length <= 11) {
			// @ts-ignore
			return `+${x[1] ? x[1] : ''} ${!x[3] ? x[2] : '(' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')}`;
		}
		return value;
	}

	parseDate(date: string) {
		try {
			let b: string[] = date.split(/\D/);
			//@ts-ignore
			return `${new Date(Date.UTC(Number(b[0]), --b[1], b[2], b[3], b[4], b[5])).toLocaleDateString()} г.`;
		} catch (err) {
			return "-";
		}
	}


}
