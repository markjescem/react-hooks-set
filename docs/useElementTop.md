# `useElementTop`

The hooks could help you get the distance of some element to the top of window.

## Usage

```jsx
import { useRef } from 'react'
import { useElementTop } from 'react-hooks-collection'

const Demo = () => {
  const ref = useRef(null)
  const top = useElementTop(ref)

  return (
    <div>
      <form>
        <input />
        <button ref={ref}>{`The distance to the top of window is ${top}.` }</button>
      <form/>
    </div>
  )
}
```
