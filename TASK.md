# Завдання: refactor class components to hooks

## 1. PostsDashboard.jsx

Замінити:

```jsx
class PostsDashboard extends Component
```

на:

```jsx
function PostsDashboard() {}
```

## 2. State

Було:

```jsx
state = {
  posts: [],
  users: [],
  searchQuery: "",
}
```

Має стати:

```jsx
const [posts, setPosts] = useState([]);
const [users, setUsers] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
```

## 3. componentDidMount

Було:

```jsx
componentDidMount() {
  this.loadData();
}
```

Має стати:

```jsx
useEffect(() => {
  loadData();
}, []);
```

## 4. componentDidUpdate для localStorage

Було:

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.perPage !== this.state.perPage) {
    localStorage.setItem("perPage", this.state.perPage);
  }
}
```

Має стати:

```jsx
useEffect(() => {
  localStorage.setItem("perPage", perPage);
}, [perPage]);
```

## 5. Методи класу

Було:

```jsx
handleSearchChange = (event) => {}
```

Має стати:

```jsx
const handleSearchChange = (event) => {};
```

## 6. this.setState

Було:

```jsx
this.setState({
  searchQuery: event.target.value,
  currentPage: 1,
});
```

Має стати:

```jsx
setSearchQuery(event.target.value);
setCurrentPage(1);
```

## 7. this.props

У `Filters.jsx` і `Pagination.jsx` замінити `this.props` на props у параметрах функції.

Було:

```jsx
const { users } = this.props;
```

Має стати:

```jsx
function Filters({ users }) {}
```
