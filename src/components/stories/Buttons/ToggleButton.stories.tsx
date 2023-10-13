import type { Meta, StoryObj } from "@storybook/react";

import ToggleButton from "../../buttons/toggle-button/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "ToggleButton",
	component: ToggleButton,
	parameters: {
		layout: "centered",
	},

	argTypes: {
		labelDirection: {
			options: ["left", "right"],
			control: { type: "radio" },
		},
	},
	args: {
		label: "",
		labelDirection: "right",
		className: "",
		classNameTumbler: "",
		classNameLabel: "",
		isActive: false,
		isDisabled: false,
	},
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	argTypes: {
		labelDirection: {
			options: ["left", "right"],
			control: { type: "radio" },
		},
	},
	args: {
		isActive: true,
		isDisabled: false,
	},
};
