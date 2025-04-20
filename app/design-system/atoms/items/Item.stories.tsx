import React from 'react';
import {View} from 'react-native';
import {Item} from './Item';

export default {
  title: '@Design-system/Atoms/Item',
  component: Item,
  decorators: [
    Story => (
      <View style={{padding: 16, backgroundColor: '#f5f5f5'}}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {
  args: {
    title: 'Item Title',
    description:
      'This is a description of the item that might be long enough to wrap to multiple lines.',
    imageUrl: 'https://64.media.tumblr.com/e869402558b7df3b798149490b728139/cec858be18729ab6-40/s1280x1920/8f9b58f145e92520528dd510e780ff04659c5498.jpg',
  },
};

export const WithoutImage = {
  args: {
    title: 'Item Without Image',
    description:
      'This item uses the default icon since no image URL is provided.',
  },
};

export const WithOptions = {
  args: {
    title: 'Item With Options',
    description: 'This item has the options button enabled.',
    imageUrl: 'https://64.media.tumblr.com/e869402558b7df3b798149490b728139/cec858be18729ab6-40/s1280x1920/8f9b58f145e92520528dd510e780ff04659c5498.jpg',
    showOptions: true,
  },
};

export const LongContent = {
  args: {
    title:
      'This is a very long title that should be truncated to a single line when it overflows',
    description:
      'This is a very long description that should be truncated to two lines when it overflows. It contains a lot of text that would normally wrap to multiple lines, but our component will handle this gracefully by showing an ellipsis at the end.',
    imageUrl: 'https://64.media.tumblr.com/e869402558b7df3b798149490b728139/cec858be18729ab6-40/s1280x1920/8f9b58f145e92520528dd510e780ff04659c5498.jpg',
    showOptions: true,
  },
};
