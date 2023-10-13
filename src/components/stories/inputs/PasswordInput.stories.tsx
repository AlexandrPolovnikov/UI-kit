import type { Meta, StoryObj } from "@storybook/react";

import PasswordInput from "../../inputs/password-input/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "PasswordInput",
	component: PasswordInput,
	parameters: {
		layout: "centered",
	},

	argTypes: {
		stage: {
			options: ["loading", "normal", "warning", "error", "success"],
			control: { type: "radio" },
		},
	},
	args: {
		textValue: "",
		label: "",
		classNameLabel: "",
		holder: "",
		isDisabled: false,
		buttonText: "",
	},
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	argTypes: {
		stage: {
			options: ["loading", "normal", "warning", "error", "success"],
			control: { type: "radio" },
		},
	},
	args: {
		textValue: "",
		label: "Введите пароль",
		classNameLabel: "",
		holder: "Введите пароль",
		isDisabled: false,
		buttonText: "",
	},
};
