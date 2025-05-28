import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {Meta, StoryObj} from '@storybook/react';
import FloatingButton from './FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'Design System/Atoms/FloatingButton',
  component: FloatingButton,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          minHeight: 700,
          backgroundColor: '#FCF7FF',
          padding: 0,
          position: 'relative',
        }}>
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

/**
 * FloatingButton is a wrapper around react-native-paper's AnimatedFAB.
 *
 * - Use `extended={true}` to show both icon and label (pill-shaped button).
 * - Use `extended={false}` to show only the icon (circular FAB).
 *
 * Example usage:
 *
 * // Extended (icon + label)
 * <FloatingButton icon="plus" label="Add" extended onPress={() => {}} />
 *
 * // Compact (icon only)
 * <FloatingButton icon="plus" label="Add" onPress={() => {}} />
 *
 * // Dynamic (e.g., hide label when scrolling)
 * const [isScrollingDown, setIsScrollingDown] = useState(false);
 * <FloatingButton icon="plus" label="Add" extended={!isScrollingDown} onPress={() => {}} />
 *
 * See the 'DynamicExtendedExample' story for a live demo of this pattern.
 */

export const ExtendedExample: Story = {
  name: 'Extended (icon + label)',
  args: {
    icon: 'plus',
    label: 'Add',
    extended: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows both icon and label. Use for primary actions.',
      },
    },
  },
};

export const CompactExample: Story = {
  name: 'Compact (icon only)',
  args: {
    icon: 'plus',
    label: 'Add',
    extended: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows only the icon. Use for secondary or less prominent actions.',
      },
    },
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

export const AppLikeExample: Story = {
  name: 'App-like Layout',
  render: args => (
    <View
      style={{
        flex: 1,
        minHeight: 700,
        backgroundColor: '#FCF7FF',
        padding: 0,
        position: 'relative',
      }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}>
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: '#eee',
            borderRadius: 8,
            marginRight: 12,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            Active Scrappers
          </Text>
        </View>
      </View>
      {/* Card List Placeholder */}
      <View style={{padding: 16}}>
        {[1, 2, 3].map(i => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 16,
              marginBottom: 16,
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}>
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: '#eee',
                borderRadius: 8,
                marginRight: 16,
              }}
            />
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold'}}>Item {i} title</Text>
              <Text style={{color: '#888', fontSize: 12}}>source.com</Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>$99.99</Text>
          </View>
        ))}
      </View>
      {/* Floating Button */}
      <View style={{position: 'absolute', right: 24, bottom: 24}}>
        <FloatingButton {...args} />
      </View>
    </View>
  ),
  args: {
    icon: 'plus',
    label: 'Create',
    extended: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example mimics the real app layout, showing the FloatingButton at the bottom right with a card list and header.',
      },
    },
  },
};

export const DynamicExtendedExample: Story = {
  name: 'Dynamic extended (scroll simulation)',
  render: function DynamicExtendedExampleRender(args) {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    return (
      <View
        style={{
          flex: 1,
          minHeight: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FloatingButton {...args} extended={!isScrollingDown} />
        <View style={{flexDirection: 'row', marginTop: 32}}>
          <Text style={{marginRight: 8}}>Simulate scroll:</Text>
          <Button
            mode={isScrollingDown ? 'contained' : 'outlined'}
            onPress={() => setIsScrollingDown(true)}
            style={{marginRight: 8}}>
            Down
          </Button>
          <Button
            mode={!isScrollingDown ? 'contained' : 'outlined'}
            onPress={() => setIsScrollingDown(false)}>
            Up
          </Button>
        </View>
      </View>
    );
  },
  args: {
    icon: 'plus',
    label: 'Create',
    onPress: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates dynamic use of the extended prop, toggling based on scroll direction (like in ScrapedProductsListScreen).',
      },
    },
  },
};
