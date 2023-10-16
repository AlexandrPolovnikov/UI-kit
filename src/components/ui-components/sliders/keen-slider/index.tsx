import { useState, ReactNode, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import classes from "./keen-slider.module.scss";

interface Props {
	autoplay?: boolean;
	slides: ReactNode[];
	activeSlide?: number;
	setActiveSlide?: (arg: number) => void;
	className?: string;
}

export default function KeenSlider({ className = "", slides, autoplay = false, activeSlide = 0, setActiveSlide }: Props) {
	const [currentSlide, setCurrentSlide] = useState(activeSlide);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		instanceRef.current?.moveToIdx(activeSlide);
	}, [activeSlide]);

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			loop: true,
			initial: 0,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
				setActiveSlide?.(slider.track.details.rel);
			},
			created() {
				setLoaded(true);
			},
		},
		[
			(slider) => {
				let timeout: NodeJS.Timeout;
				let mouseOver = false;

				function clearNextTimeout() {
					clearTimeout(timeout);
				}

				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver || !autoplay) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 5000);
				}

				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			},
		],
	);

	return (
		<div className={`${classes.slider} ${className} row`}>
			<div
				ref={sliderRef}
				className="keen-slider"
			>
				{slides}
			</div>
			{loaded && instanceRef.current && (
				<div className={`${classes.dots} column`}>
					{slides.map((_, index) => {
						return (
							<button
								key={index}
								onClick={() => {
									instanceRef.current?.moveToIdx(index);
									setActiveSlide?.(index);
								}}
								className={`${classes.plainDot} ${currentSlide === index ? classes.activeDot : ""}`}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
