# Virtualized Item List

A high-performance list component for React Native that uses virtualization to efficiently render large datasets.

## Features

- Uses React Native's `FlatList` for efficient rendering of large lists
- Only renders items that are visible on the screen
- Supports pull-to-refresh functionality
- Customizable rendering parameters for optimal performance
- Reusable hook for consistent list configuration across the app

## Usage

```tsx
import VirtualizedItemList from '@design-system/molecules/list/virtualizedItemList';

// In your component
<VirtualizedItemList
  items={yourItems}
  onPressItem={handleItemPress}
  onRefetch={handleRefetch}
  refreshing={isLoading}
/>
```

## Performance Optimization

The component uses several techniques to optimize performance:

1. **Virtualization**: Only renders items that are visible on the screen
2. **Windowing**: Maintains a small window of items around the visible area
3. **Batch Rendering**: Controls how many items are rendered in each batch
4. **Item Recycling**: Reuses item components when they go off-screen

## Customization

You can customize the rendering behavior by passing the following props:

- `initialNumToRender`: Number of items to render initially (default: 10)
- `maxToRenderPerBatch`: Maximum number of items to render in each batch (default: 10)
- `windowSize`: Number of items to render outside the visible area (default: 5)
- `removeClippedSubviews`: Whether to remove items that are off-screen (default: true)

## Hook Usage

You can also use the `useVirtualizedList` hook to get consistent list configuration:

```tsx
import useVirtualizedList from '@hooks/useVirtualizedList';

// In your component
const {listProps} = useVirtualizedList({
  initialNumToRender: 15,
  maxToRenderPerBatch: 15,
});

// Then spread the props to your FlatList
<FlatList {...listProps} />
``` 