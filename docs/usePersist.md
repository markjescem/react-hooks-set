# `usePersist`

The hook could track the state of page. When then page is reopened, the memorized of state will be recovered automatically.

## Usage

```jsx
import { usePersist } from 'react-hooks-set';

const Demo = props => {
  const { history } = props;
  const [remark, setRemark, clearRemark] = usePersist('remark', false);

  const handleChange = e => {
    setRemark(e.target.value);
  };

  const toBack = () => {
    history.push('/back');
    clearRemark();
  };

  const toForward = () => {
    history.push('/forward');
  };

  return (
    <form>
      <input value={remark} onChange={handleChange} />
      <button onClick={toBack}>ToBack</button>
      <button onClick={toForward}>ToForward</button>
    </form>
  );
};
```

## Reference

```js
usePersist(key);
usePersist(key, persistEvenWindowClosed);
```

- `key` &mdash; `localStorage` or `sessionStorage` key to manage.
- `persistEvenWindowClosed` &mdash; boolean, if set to `false`, hook will use sessionSorage to store state, and state will be cleared when page closed.
