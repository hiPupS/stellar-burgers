import { FeedInfoUI } from '@ui';
import type { TFeedStats } from '../components/ui/feed-info/type';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const feedArgs: TFeedStats = {
  total: 12,
  totalToday: 2
};

export const DefaultFeedInfo: Story = {
  args: {
    feed: feedArgs,
    readyOrders: [123, 124, 125],
    pendingOrders: [126, 127]
  }
};
