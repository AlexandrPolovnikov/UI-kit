import type { Meta, StoryObj } from "@storybook/react";

import RadioInput from "../../inputs/radio-input/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "RadioInput",
	component: RadioInput,
	parameters: {
		layout: "centered",
	},

	argTypes: {
		size: {
			options: ["small", "medium", "large"],
			control: { type: "radio" },
		},
		borderSize: {
			options: ["thin", "thick"],
			control: { type: "radio" },
		},
	},
	args: {
		label: "",
		borderSize: "thin",
		circleColorBorder: "circle__border__color__default",
		switchColor: "switch__color__default",
		isDisabled: false,
	},
} satisfies Meta<typeof RadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	argTypes: {
		size: {
			options: ["small", "medium", "large"],
			control: { type: "radio" },
		},
		borderSize: {
			options: ["thin", "thick"],
			control: { type: "radio" },
		},
	},
	args: {
		label: "",
		borderSize: "thin",
		circleColorBorder: "circle__border__color__default",
		switchColor: "switch__color__default",
		isDisabled: false,
	},
};
