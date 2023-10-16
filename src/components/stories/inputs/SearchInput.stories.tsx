import type { Meta, StoryObj } from "@storybook/react";

import SearchInput from "../../inputs/search-input/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "SearchInput",
	component: SearchInput,
	parameters: {
		layout: "centered",
	},
	args: {
		textValue: "",
		label: "",
		className: "",
		classNameLabel: "",
		classNameContainer: "",
		holder: "",
		isDisabled: true,
		isRequired: true,
		classNameInput: "",
		stageText: "",
	},
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		textValue: "",
		label: "Поиск",
		className: "",
		classNameLabel: "",
		classNameContainer: "",
		holder: "Найдется все",
		isDisabled: true,
		isRequired: true,
		classNameInput: "",
		stageText: "",
	},
};
