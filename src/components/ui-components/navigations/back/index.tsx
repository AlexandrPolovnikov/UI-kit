import classes from "./back.module.scss";
import StraightArrowLeftImage from "~/public/assets/left.svg";
import { useRouter } from "next/router";

interface Props {
    link?: string;
    isDisabled?: boolean;
}

export default function BackButton({ link = "", isDisabled = false }: Props) {
    const router = useRouter();
    const onClick = () => {
        if (!!link) {
            router.push(link);
        } else {
            router.back();
        }
    };

    return (
        <button className={classes.toggle__button} disabled={isDisabled} onClick={onClick}>
            <StraightArrowLeftImage />
        </button>
    );
}
