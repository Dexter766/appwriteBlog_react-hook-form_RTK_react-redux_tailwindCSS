import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import Button from "./Button";

const myDebounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const SearchBar = ({ posts, setSearchResults }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    const results = posts.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });
    setSearchResults(results);
  };

  const handleSearchChange = (e) => {
    if (!e.target.value) {
      setSearchResults(posts);
    }
    const search = e.target.value;
    const results = posts.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });
    setSearchResults(results);
  };

  const debounceChange = myDebounce(handleSearchChange, 400);

  return (
    <form className="flex flex-1" onSubmit={handleSubmit}>
      <Input
        type="text"
        id="search"
        placeholder="Search"
        onChange={debounceChange}
      />
      <Button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </form>
  );
};

export default SearchBar;
