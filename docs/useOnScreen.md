# `useOnScreen`

The hooks could help you detect when an element is visible on the screen as well as specify how much of the element should be visible on screen. And you could use it for lazy loading images or triggering animations when the page has scrolled down to a particular section.

## Usage

```jsx
import { useState, useRef } from 'react';
import { useOnScreen } from 'react-hooks-collection';

const Demo = () => {
  const ref = useRef(null);
  const isImageTotalVisible = useOnScreen(ref, 0, false);
  const isImagePartialVisible = useOnScreen(ref, 0, true);

  return (
    <>
      <div>{`isImageTotalVisible: ${isImageTotalVisible}`}</div>
      <div>{`isImagePartialVisible: ${isImagePartialVisible}`}</div>
      <div ref={ref}>
        <img src="./pic.png" />
      </div>
    </>
  );
};
```

## Reference

```js
useOnScreen(ref, offset, partialVisibility);
```

- `ref` &mdash; the specified element that is visible on the viewport or not.
- `offset` &mdash; number, the offset (both height and width) that the element needs to be visible on the viewport.
- `partialVisibility` &mdash; boolean, if set to `true`, the hook would return true when the element is partial visible on the viewport. Or the element needs to be total visible on the viewport.