import React from 'react';
import {View} from 'react-native';
import {Meta, StoryObj} from '@storybook/react';
import FloatingButton from './FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'Design System/Atoms/FloatingButton',
  component: FloatingButton,
  decorators: [
    Story => (
      <View style={{flex: 1, height: 400, position: 'relative'}}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name from MaterialIcons',
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
    extended: {
      control: 'boolean',
      description: 'Whether to show the extended FAB with label',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback when button is pressed',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    icon: 'plus',
    label: 'Add',
    extended: true,
  },
};

export const Compact: Story = {
  args: {
    icon: 'plus',
    label: 'Add',
    extended: false,
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: 'edit',
    label: 'Edit',
    extended: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    icon: 'plus',
    label: '',
    extended: false,
  },
}; 