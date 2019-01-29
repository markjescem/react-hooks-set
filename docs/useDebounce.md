# `useDebounce`

The hooks could help you debounce any fast changing value. The debounced value will only reflect the latest value when the hook has not been called for specified time period.

## Usage

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-hooks-collection';

const Demo = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceName = useDebounce(name, 800);

  useEffect(
    async () => {
      if (debounceName) {
        setIsSearching(true);
        const data = await fetchBookList(debounceName);
        setIsSearching(false);
        setResult(data);
      } else {
        setResult([]);
      }
    },
    [debounceName]
  );

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      {isSearching && <div>Loading...</div>}
      {result.map(item => (
        <div>{item.name}</div>
      ))}
    </form>
  );
};

async function fetchBookList(name) {
  try {
    const res = await fetch(`http://demo.com/v3/books?name=${name}`, {
      method: 'GET'
    });
    return res.data.results;
  } catch (error) {
    console.err(error);
    return [];
  }
}
```

## Reference

```js
useDebounce(value, delay);
```

- `value` &mdash; the value which needs to be debounced.
- `delay` &mdash; number, the time period for the hook called again.
