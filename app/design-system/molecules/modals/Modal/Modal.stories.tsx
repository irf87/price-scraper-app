import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Meta, StoryObj} from '@storybook/react';
import Modal from './Modal';
import {Button, TextInput, HelperText} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Molecules/Modal',
  component: Modal,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            minHeight: 667,
            minWidth: 375,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}>
          <Story />
        </View>
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The Modal component is used to display content in a layer above the app.\nIt is commonly used for confirmations, forms, and important messages.\n\n**Usage Example:**\n\n\u0060\u0060\u0060tsx\n<Modal\n  visible={modalVisible}\n  title=\"Delete Product\"\n  onDismiss={closeModal}\n  footerButtons={\n    <>\n      <Button mode=\"outlined\" onPress={closeModal}>Cancel</Button>\n      <Button mode=\"contained\" buttonColor=\"red\" onPress={handleDelete}>Delete</Button>\n    </>\n  }\n>\n  <Text>Are you sure you want to delete this product?</Text>\n</Modal>\n\u0060\u0060\u0060\n        `,
      },
    },
  },
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

export const FormExample: Story = {
  args: {
    visible: true,
    title: 'Create New Item',
    onDismiss: () => console.log('Dismissed'),
    children: (
      <ScrollView>
        <TextInput label="Name" mode="outlined" style={{marginBottom: 16}} />
        <TextInput
          label="Description"
          mode="outlined"
          multiline
          numberOfLines={4}
          style={{marginBottom: 16}}
        />
        <HelperText type="info">
          Please provide a detailed description of the item
        </HelperText>
      </ScrollView>
    ),
    footerButtons: (
      <>
        <Button mode="outlined">Cancel</Button>
        <Button mode="contained">Create Item</Button>
      </>
    ),
  },
};

export const LongContentExample: Story = {
  args: {
    visible: true,
    title: 'Terms and Conditions',
    onDismiss: () => console.log('Dismissed'),
    children: (
      <ScrollView>
        <Text style={{lineHeight: 24}}>
          {Array(10)
            .fill(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            )
            .join('\n\n')}
        </Text>
      </ScrollView>
    ),
    footerButtons: (
      <>
        <Button mode="outlined">Decline</Button>
        <Button mode="contained">Accept</Button>
      </>
    ),
  },
};

export const ConfirmationExample: Story = {
  args: {
    visible: true,
    title: 'Confirm Action',
    onDismiss: () => console.log('Dismissed'),
    children: (
      <View style={{padding: 16}}>
        <Text style={{fontSize: 16, lineHeight: 24}}>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Text>
      </View>
    ),
    footerButtons: (
      <>
        <Button mode="outlined">Cancel</Button>
        <Button mode="contained" textColor="white" buttonColor="red">
          Delete
        </Button>
      </>
    ),
  },
};

export const DeleteProductExample: Story = {
  args: {
    visible: true,
    title: 'Delete Product',
    onDismiss: () => console.log('Dismissed'),
    children: (
      <View style={{padding: 16}}>
        <Text>
          Are you sure you want to delete the product "iPhone 15 Pro"? This
          action cannot be undone.
        </Text>
      </View>
    ),
    footerButtons: (
      <>
        <Button mode="outlined">Cancel</Button>
        <Button mode="contained" buttonColor="red">
          Delete
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'This is a real-world example of using the Modal for a destructive action confirmation in a product management screen.',
      },
    },
  },
};
