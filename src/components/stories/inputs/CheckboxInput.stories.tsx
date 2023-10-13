import type { Meta, StoryObj } from "@storybook/react";

import CheckboxInput from "../../inputs/checkbox-input/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "CheckboxInput",
	component: CheckboxInput,
	parameters: {
		layout: "centered",
	},

	argTypes: {
		// activeColor: {
		// 	options: ["primary", "secondary", "tertiary", "quaternary", "quinary"],
		// 	control: { type: "radio" },
		// },
		// buttonSize: {
		// 	options: ["large", "normal", "medium", "small", "extraSmall"],
		// 	control: { type: "radio" },
		// },
		// type: {
		// 	options: ["submit", "reset", "button"],
		// 	control: { type: "radio" },
		// },
	},
	args: {
		isActive: true,
		activeColor: "square__color__active",
		offColor: "",
		borderColor: "",
		borderColorHover: "",
		size: "",
		fillColor: "",
		isDisabled: true,
		isRequired: true,
		label: "",
		className: "",
		classNameLabel: "",
	},
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	argTypes: {
		// colorType: {
		// 	options: ["primary", "secondary", "tertiary", "quaternary", "quinary"],
		// 	control: { type: "radio" },
		// },
		// buttonSize: {
		// 	options: ["large", "normal", "medium", "small", "extraSmall"],
		// 	control: { type: "radio" },
		// },
		// type: {
		// 	options: ["submit", "reset", "button"],
		// 	control: { type: "radio" },
		// },
	},
	args: {
		// buttonText: "button",
		isActive: true,
		isDisabled: true,
		isRequired: true,
	},
};
