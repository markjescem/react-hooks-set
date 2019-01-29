# `useScrollPosition`

The hooks could memorize vertical scrolling position of page which is closed. When then page is reopened, the data of postion will be recovered and it will scroll to the original postion.

## Usage

If the scrollable section is window, just use the hooks.

```jsx
import { useScrollPosition } from 'react-hooks-collection'

const Demo = () => {
  useScrollPosition()

  return (
    <div>
      <form>
        <input />
        <button>submit</button>
      <form/>
    </div>
  )
}
```

In some cases, the scrollable section is just a container of dom. So you need set the id of the container, and pass the name of id to the hooks.

```jsx
import { useRef } from 'react'
import { useScrollPosition } from 'react-hooks-collection'

const Demo = () => {
  const ref = useRef(null)
  useScrollPosition(ref)

  return (
    <div>
      <form ref={ref}>
        <input />
        <button>submit</button>
      <form/>
    </div>
  )
}
```

## Reference

```js
useScrollPosition(scollRef);
useScrollPosition(scollRef, positionDataKey);
useScrollPosition(scollRef, positionDataKey, storePositionEvenWindowClosed);
```

- `scollRef` &mdash; If scrollable content is not window, you could set ref to the srcollable content and pass ref to hook, or the scrollable content is window by default.
- `positionDataKey` &mdash; `localStorage` or `sessionStorage` key to manage position data.
- `storePositionEvenWindowClosed` &mdash; boolean, if set to `false`, hook will use sessionSorage to store position data, and data will be cleared when page closed.