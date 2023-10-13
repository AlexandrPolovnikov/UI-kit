import type { Meta, StoryObj } from "@storybook/react";

import PhoneInput from "../../inputs/phone-input/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "PhoneInput",
	component: PhoneInput,
	parameters: {
		layout: "centered",
	},
	args: {
		phoneValue: "",
		isDisabled: true,
		isRequired: true,
		label: "",
		textValue: "",
		stage: "normal",
		stageText: "",
	},
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		phoneValue: "",
		isDisabled: true,
		isRequired: true,
		label: "Введите номер",
		textValue: "",
		stage: "normal",
		stageText: "",
	},
};
