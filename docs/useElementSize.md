# `useElementSize`

The hooks could help you get the size of some element.

## Usage

```jsx
import { useRef } from 'react'
import { useElementSize } from 'react-hooks-collection'

const Demo = () => {
  const ref = useRef(null)
  const size = useElementSize(ref)

  return (
    <div>
      <form>
        <input />
        <button ref={ref}>{`The size of the button is: width: ${size.width}, height: ${size.height}.` }</button>
      <form/>
    </div>
  )
}
```
