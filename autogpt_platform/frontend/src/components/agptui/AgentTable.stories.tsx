import type { Meta, StoryObj } from "@storybook/react";
import { AgentTable } from "./AgentTable";
import { AgentTableRowProps } from "./AgentTableRow";
import { userEvent, within, expect } from "@storybook/test";
import { StatusType } from "./Status";

const meta: Meta<typeof AgentTable> = {
  title: "AGPT UI/Agent Table",
  component: AgentTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentTable>;

const sampleAgents: AgentTableRowProps[] = [
  {
    id: "agent-1",
    agentName: "Super Coder",
    description: "An AI agent that writes clean, efficient code",
    imageSrc:
      "https://ddz4ak4pa3d19.cloudfront.net/cache/53/b2/53b2bc7d7900f0e1e60bf64ebf38032d.jpg",
    dateSubmitted: "2023-05-15",
    status: "approved",
    runs: 1500,
    rating: 4.8,
    onEdit: () => console.log("Edit Super Coder"),
  },
  {
    id: "agent-2",
    agentName: "Data Analyzer",
    description: "Processes and analyzes large datasets with ease",
    imageSrc:
      "https://ddz4ak4pa3d19.cloudfront.net/cache/40/f7/40f7bc97c952f8df0f9c88d29defe8d4.jpg",
    dateSubmitted: "2023-05-10",
    status: "awaiting_review",
    runs: 1200,
    rating: 4.5,
    onEdit: () => console.log("Edit Data Analyzer"),
  },
  {
    id: "agent-3",
    agentName: "UI Designer",
    description: "Creates beautiful and intuitive user interfaces",
    imageSrc:
      "https://ddz4ak4pa3d19.cloudfront.net/cache/14/9e/149ebb9014aa8c0097e72ed89845af0e.jpg",
    dateSubmitted: "2023-05-05",
    status: "draft",
    runs: 800,
    rating: 4.2,
    onEdit: () => console.log("Edit UI Designer"),
  },
];

export const Default: Story = {
  args: {
    agents: sampleAgents,
  },
};

export const EmptyTable: Story = {
  args: {
    agents: [],
  },
};

// Tests
export const InteractionTest: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const editButtons = await canvas.findAllByText("Edit");
    await userEvent.click(editButtons[0]);
    // You would typically assert something here, but console.log is used in the mocked function
  },
};

export const EmptyTableTest: Story = {
  ...EmptyTable,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emptyMessage = canvas.getByText("No agents found");
    expect(emptyMessage).toBeTruthy();
  },
};