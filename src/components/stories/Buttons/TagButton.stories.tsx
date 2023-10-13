import type { Meta, StoryObj } from "@storybook/react";

import TagButton from "../../buttons/tag-button/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "TagButton",
	component: TagButton,
	parameters: {
		layout: "centered",
	},
	args: {
		isNotified: false,
		isActive: true,
		buttonText: "button",
	},
} satisfies Meta<typeof TagButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		isNotified: false,
		isActive: true,
		buttonText: "button",
	},
};
