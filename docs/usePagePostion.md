# `usePagePostion`

The hooks could memorize vertical scrolling position of page which is closed. When then page is reopened, the data of postion will be recovered and it will scroll to the original postion.

## Usage

If the scrollable section is window, just use the hooks.

```jsx
import { usePagePostion } from 'react-hooks-use'

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
import { usePagePostion } from 'react-hooks-use'

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
