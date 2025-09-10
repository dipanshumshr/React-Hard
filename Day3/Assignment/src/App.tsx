import { useEffect, useState , useCallback } from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query'
import { getRepo } from './Api/getRepo'
import RepoCard from './RepoCard';
import { useBookmarkStore } from './store/BookmarkStore';
import { useSearchStore } from './store/RepoStore';


type Repo = {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    owner: {
        avatar_url: string;
    };
};

function App() {
  const [debouncedSearch , setDebouncedSearch] = useState<string>("")
  const [typing , setTyping ] = useState<boolean>(false)
  
  const { data , isFetching , isError , refetch}  = useQuery({
    queryKey : ["Repo" , debouncedSearch],
    queryFn : () => getRepo(debouncedSearch),
    enabled : !!debouncedSearch,
  })

  const { bookmarks,  showBookmarkOnly , addBookmark, removeBookmark , toggleShowBookmark } = useBookmarkStore();

  const { searchTerm, searchResults, setSearchTerm, setSearchResults } = useSearchStore();


  useEffect(()=> {
    if(data && data.items)
    {
      setSearchResults(data.items)
    }
  },[data , setSearchResults])



  useEffect(()=>{
    setTyping(true)
    const timer = setTimeout(()=>{
      setTyping(false)
      setDebouncedSearch(searchTerm)
    },500)

    return () => {
      clearTimeout(timer)
    }
  },[searchTerm])


  const handleFilterBookmark = useCallback(() => {
    toggleShowBookmark();
}, [toggleShowBookmark]);

  const resultArray = searchResults.slice(0,30)


  const reposToDisplay = showBookmarkOnly
  ? resultArray.filter((repo : Repo) => bookmarks.includes(repo.id))
  : resultArray;

  return (
   <div className='container'>
            <header className="app-header">
                <h1>GitHub Repo Search</h1>
                <div className="search-bar">
                    <input
                        id="repo-search-input"
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="enter the user name"
                    />

                    <button className="filter-btn" onClick={handleFilterBookmark}>{showBookmarkOnly ? "Remove Filter" : "Filter Bookmarked"}</button>
                </div>

                <div className="status-indicator">
                        {isFetching && !typing && <p>Searching...</p>}
                        {typing && <p>Typing...</p>}
                    </div>
            </header>


            {isError && (
                <div className="status-message error">
                    <p>Something went wrong. Please try again.</p>
                    <button onClick={() => refetch()}>Try Again</button>
                </div>
            )}
            
            <ul className="repo-list">
                {reposToDisplay && reposToDisplay.map((repo: Repo) => (
                    <RepoCard key={repo.id}
                     repo={repo} 
                     onAdd = {addBookmark} 
                     onRemove = {removeBookmark} 
                     bookMark = {bookmarks.includes(repo.id)} />
                ))}
            </ul>
        </div>
  )
}

export default App
