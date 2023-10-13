import type { Meta, StoryObj } from "@storybook/react";

import NumberInput from "../../inputs/number-input/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "NumberInput",
	component: NumberInput,
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
		value: "Введите номер ИНН",
		label: "6846843656546",
		className: "",
		classNameLabel: "",
		classNameContainer: "",
		holder: "",
		isDisabled: true,
		isRequired: true,
		stageText: "",
	},
} satisfies Meta<typeof NumberInput>;

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
		value: "",
		label: "Введите номер ИНН",
		className: "",
		classNameLabel: "",
		classNameContainer: "",
		holder: "6846843656546",
		isDisabled: true,
		isRequired: true,
		stageText: "",
	},
};
