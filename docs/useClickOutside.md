# `useClickOutside`

The hooks could help you listen click event on the outside of a specific area. The passed callback function would be executed when the outside area is clicked.

## Usage

```jsx
import { useState, useRef } from 'react';
import { useClickOutside } from 'react-hooks-collection';

const Demo = () => {
  const [value, setValue] = useState('');
  const formRef = useRef(null);
  useClickOutside(formRef, () => setValue('form outside is clicked'));

  return (
    <form ref={formRef}>
      <input value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
};
```

## Reference

```js
useClickOutside(ref, onClickOutside);
```

- `ref` &mdash; the specific area which click event is invalid.
- `onClickOutside` &mdash; callback function which would be executed when the outside is clicked.
