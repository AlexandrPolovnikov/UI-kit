import Warning from "./svg/Info";
import Loading from "./svg/Loader";
import Error from "./svg/Error";
import Success from "./svg/Check";

export default function StageComponents(stage: string) {
	switch (stage) {
		case "normal":
			return {
				class: "",
				text: "",
				svg: "",
			};
		case "warning":
			return {
				class: "warning",
				text: "Предупреждение",
				svg: <Warning />,
			};
		case "loading":
			return {
				class: "loading",
				text: "Загрзука",
				svg: <Loading />,
			};
		case "error":
			return {
				class: "error",
				text: "Ошибка",
				svg: <Error />,
			};
		case "success":
			return {
				class: "success",
				text: "Подтвержден",
				svg: <Success />,
			};
		default:
			return {
				class: "",
				text: "",
				svg: "",
			};
	}
}
