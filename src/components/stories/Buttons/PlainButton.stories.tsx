import type { Meta, StoryObj } from "@storybook/react";

import PlainButtonButton from "../../buttons/plain-button/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "PlainButton",
	component: PlainButtonButton,
	parameters: {
		layout: "centered",
	},

	argTypes: {
		colorType: {
			options: ["primary", "secondary", "tertiary", "quaternary", "quinary"],
			control: { type: "radio" },
		},
		buttonSize: {
			options: ["large", "normal", "medium", "small", "extraSmall"],
			control: { type: "radio" },
		},
		type: {
			options: ["submit", "reset", "button"],
			control: { type: "radio" },
		},
	},
	args: {
		buttonText: "button",
		isDisabled: false,
	},
} satisfies Meta<typeof PlainButtonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	argTypes: {
		colorType: {
			options: ["primary", "secondary", "tertiary", "quaternary", "quinary"],
			control: { type: "radio" },
		},
		buttonSize: {
			options: ["large", "normal", "medium", "small", "extraSmall"],
			control: { type: "radio" },
		},
		type: {
			options: ["submit", "reset", "button"],
			control: { type: "radio" },
		},
	},
	args: {
		buttonText: "button",
		isDisabled: false,
	},
};
