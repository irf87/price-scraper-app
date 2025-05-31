import React from 'react';
import {View, Text} from 'react-native';
import {Meta, StoryObj} from '@storybook/react';
import {Animated} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ScreenLayout from './ScreenLayout';

const meta: Meta<typeof ScreenLayout> = {
  title: 'Design System/Templates/ScreenLayout',
  component: ScreenLayout,
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
The ScreenLayout component provides a consistent layout for screens in your app, including optional headers, background color, and search sections.\n\n**Usage Example:**\n\n\u0060\u0060\u0060tsx\n<ScreenLayout\n  showHeader\n  headerTitle=\"Product Details\"\n  backgroundColor=\"#fff\"\n>\n  <Text>Product details go here</Text>\n</ScreenLayout>\n\u0060\u0060\u0060\n        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScreenLayout>;

// Create a sample animated value for the spin prop
const createSpinAnimation = () => {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }),
  ).start();
  return spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
};

export const Default: Story = {
  args: {
    children: <Text style={{padding: 16}}>Default Screen Content</Text>,
    showHeader: true,
    headerTitle: 'Default Screen',
    backgroundColor: '#fff',
  },
};

export const WithHeaderAndSpin: Story = {
  args: {
    children: (
      <Text style={{padding: 16}}>Screen with Header and Spin Animation</Text>
    ),
    showHeader: true,
    headerTitle: 'Animated Header',
    spin: createSpinAnimation(),
    backgroundColor: '#f5f5f5',
  },
};

export const WithoutHeader: Story = {
  args: {
    children: <Text style={{padding: 16}}>Screen without Header</Text>,
    showHeader: false,
    backgroundColor: '#fff',
  },
};

export const CustomBackground: Story = {
  args: {
    children: (
      <Text style={{padding: 16, color: '#fff'}}>
        Screen with Custom Background
      </Text>
    ),
    showHeader: true,
    headerTitle: 'Custom Background',
    backgroundColor: '#2196F3',
  },
};

const WithSearchSectionComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <ScreenLayout
      showHeader={true}
      headerTitle="With Search Section"
      backgroundColor="#fff">
      <ScreenLayout.SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search items..."
      />
      <Text style={{padding: 16}}>Content below search section</Text>
    </ScreenLayout>
  );
};

export const WithSearchSection: Story = {
  render: () => <WithSearchSectionComponent />,
};

export const ProductDetailsExample: Story = {
  args: {
    showHeader: true,
    headerTitle: 'Product Details',
    backgroundColor: '#fff',
    children: (
      <View style={{padding: 16}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>iPhone 15 Pro</Text>
        <Text style={{marginVertical: 8}}>
          Experience the next generation of smartphone technology with the
          iPhone 15 Pro. Featuring a stunning display, advanced camera system,
          and all-day battery life.
        </Text>
        <Text style={{fontWeight: 'bold', marginTop: 16}}>Price: $999</Text>
      </View>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A real-world example of using ScreenLayout for a product details page in an e-commerce app.',
      },
    },
  },
};
