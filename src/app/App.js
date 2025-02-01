import Listings from '../features/listings/Listings';
import Search from '../features/search/Search';
import Subreddits from '../features/subreddits/Subreddits';
import {ReactComponent as RedditIcon} from "../components/icons/reddit.svg"

function App() {
  return (
    <div className="App">
      <header className="container app-header">
        <RedditIcon className='reddit-icon' />
        <h1>Reddit<span>Minimal</span></h1>
        <Search />
      </header>
      <main>
        <Listings />
        <Subreddits />
      </main>
    </div>
  );
}

export default App;
