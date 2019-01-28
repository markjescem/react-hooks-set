# `useElementLeft`

The hooks could help you get the distance of some element to the left of window.

## Usage

```jsx
import { useRef } from 'react'
import { useElementLeft } from 'react-hooks-collection'

const Demo = () => {
  const ref = useRef(null)
  const left = useElementLeft(ref)

  return (
    <div>
      <form>
        <input />
        <button ref={ref}>{`The distance to the left of window is ${left}.` }</button>
      <form/>
    </div>
  )
}
```
