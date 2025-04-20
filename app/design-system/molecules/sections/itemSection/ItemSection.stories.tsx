import React from 'react';
import {View} from 'react-native';
import {ItemSection} from './ItemSection';

export default {
  title: '@Design-system/Molecules/ItemSection',
  component: ItemSection,
};

const mockItems = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Description for item 1',
    imageUrl: 'https://m.media-amazon.com/images/I/61zobySjWxL.jpg',
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Description for item 2',
    imageUrl: 'https://m.media-amazon.com/images/I/61zobySjWxL.jpg',
  },
];

export const WithImage = () => (
  <View style={{padding: 20}}>
    <ItemSection
      imageUrl="https://64.media.tumblr.com/19916f87f92b69737d91678945d58535/798b1a42bd190248-c4/s1280x1920/86e2386ea196d50878abc386249f5cef9f4ac862.jpg"
      title="Section Title"
      description="This is a section description"
      items={mockItems}
      onUpdateItem={id => console.log('Update item', id)}
      onDeleteItem={id => console.log('Delete item', id)}
    />
  </View>
);

export const WithoutImage = () => (
  <View style={{padding: 20}}>
    <ItemSection
      title="Section Title"
      description="This is a section description"
      items={mockItems}
      onUpdateItem={id => console.log('Update item', id)}
      onDeleteItem={id => console.log('Delete item', id)}
    />
  </View>
);

export const WithoutDescription = () => (
  <View style={{padding: 20}}>
    <ItemSection
      imageUrl="https://via.placeholder.com/80"
      title="Section Title"
      items={mockItems}
      onUpdateItem={id => console.log('Update item', id)}
      onDeleteItem={id => console.log('Delete item', id)}
    />
  </View>
);
