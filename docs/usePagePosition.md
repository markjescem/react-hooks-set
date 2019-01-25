# `usePagePostion`

The hooks could memorize vertical scrolling position of page which is closed. When then page is reopened, the data of postion will be recovered and it will scroll to the original postion.

## Usage

If the scrollable section is window, just use the hooks.

```jsx
import { usePagePostion } from 'react-hooks-collection'

const Demo = () => {
  usePagePostion()

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
import { usePagePostion } from 'react-hooks-collection'

const Demo = () => {
  usePagePostion('scrollPage')

  return (
    <div>
      <form id="scrollPage">
        <input />
        <button>submit</button>
      <form/>
    </div>
  )
}
```

## Reference

```js
usePagePostion(scollableElementId);
usePagePostion(scollableElementId, positionDataKey);
usePagePostion(
  scollableElementId,
  positionDataKey,
  storePositionEvenWindowClosed
);
```

- `scollableElementId` &mdash; If scrollable content is not window, you could set id to the srcollable content and pass id to hook, or the scrollable content is window by default.
- `positionDataKey` &mdash; `localStorage` or `sessionStorage` key to manage position data.
- `storePositionEvenWindowClosed` &mdash; boolean, if set to `false`, hook will use sessionSorage to store position data, and data will be cleared when page closed.
