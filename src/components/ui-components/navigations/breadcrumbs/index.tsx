import Link from "next/link";
import classes from "./breadcrumbs.module.scss";
import SeparatorPoint from "./image/point.svg";

export interface Crumb {
	path: string;
	label: string;
}
interface Props {
	breadcrumbs: Crumb[];
}
export default function Breadcrumbs({ breadcrumbs }: Props) {
	return (
		<div className={classes.breadcrumbs}>
			{breadcrumbs.map((crumb: Crumb, index: number) => {
				return (
					<div
						key={index}
						className={`${classes.crumb} ${breadcrumbs.length - 1 === index ? classes.active : ""}`}
					>
						{index !== 0 && <SeparatorPoint />}
						<Link href={crumb.path}>{crumb.label}</Link>
					</div>
				);
			})}
		</div>
	);
}
