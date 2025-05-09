import React from 'react';
import { View, Text } from 'react-native';
import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from 'react-native-paper';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    visible: true,
    title: 'Modal Title',
    onDismiss: () => console.log('Dismissed'),
    children: <Text>Modal Content</Text>,
    footerButtons: (
      <>
        <Button mode="outlined">Cancel</Button>
        <Button mode="contained">Save</Button>
      </>
    ),
  },
}; 