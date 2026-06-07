// import React, { Component } from "react";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { useEffect, useState, useRef } from "react";

export default function PostsDashboard({ }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("all");
  const [sortType, setSortType] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const oldPerPageRef = useRef(perPage);

useEffect(() => {
 const savedPerPage = localStorage.getItem("perPage");

if (savedPerPage) {
  setPerPage(Number(savedPerPage))
}

loadData();
}, []);

useEffect(() => {
const pOld = oldPerPageRef.current;

      if (pOld !== perPage) {
      localStorage.setItem("perPage", perPage);
    }
},[]);

const  loadData = async () => {
    setLoading(true);
    setError(null);

     try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/users"),
      ]);

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to load data");
      }

      const posts = await postsResponse.json();
      const users = await usersResponse.json();

setPosts(posts);
setUsers(users);
setLoading(false);

    } catch (error) {
    setError(error.message);
    setLoading(false)
    }
}

  const   handleSearchChange = (event) => {
   setSearchQuery(event.target.value);
   setCurrentPage(1)

  };

const  handleUserChange = (event) => {
setSelectedUserId(event.target.value);
     setCurrentPage(1);
  };

 const handleSortChange = (event) => {
  setSortType(event.target.value);
      setCurrentPage(1);
    // this.setState({
    //   sortType: event.target.value,
    //   currentPage: 1,
    // });
  };

 const handlePerPageChange = (event) => {
  setPerPage(Number(event.target.value));
        setCurrentPage(1);
    // this.setState({
    //   perPage: Number(event.target.value),
    //   currentPage: 1,
    // });
  };

 const handlePageChange = (page) => {
     setCurrentPage(page);
  };

 const handleNextPage = () => {
  setCurrentPage(p => p + 1)
    // this.setState((prevState) => ({
    //   currentPage: prevState.currentPage + 1,
    // }));
  };

 const handlePreviousPage = () => {
    setCurrentPage(p => p - 1)
    // this.setState((prevState) => ({
    //   currentPage: prevState.currentPage - 1,
    // }));
  };

 const resetFilters = () => {
  setSearchQuery("");
  setSelectedUserId("all");
  setSortType("newest");
     setCurrentPage(1);
     setPerPage(5);
    // this.setState({
    //   searchQuery: "",
    //   selectedUserId: "all",
    //   sortType: "newest",
    //   currentPage: 1,
    //   perPage: 5,
    // });
  };

  const getFilteredPosts = () => {
    // const { posts, searchQuery, selectedUserId, sortType } = this.state;

    let filteredPosts = [...posts];

    if (searchQuery.trim() !== "") {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedUserId !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.userId === Number(selectedUserId)
      );
    }

    if (sortType === "newest") {
      filteredPosts.sort((a, b) => b.id - a.id);
    }

    if (sortType === "oldest") {
      filteredPosts.sort((a, b) => a.id - b.id);
    }

    if (sortType === "title-az") {
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "title-za") {
      filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filteredPosts;
  };

 const getCurrentPosts = () => {
    // const { currentPage, perPage } = this.state;

    const filteredPosts = getFilteredPosts();

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;

    return filteredPosts.slice(firstIndex, lastIndex);
  };

  const getTotalPages = () => {
    // const { perPage } = this.state;

    return Math.ceil(getFilteredPosts().length / perPage);
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);

    return user ? user.name : "Unknown user";
  };

    const currentPosts = getCurrentPosts();
     const totalPages = getTotalPages();
    const filteredPostsCount = getFilteredPosts().length;

  return(
      <div className="dashboard">
        <h1>Posts Dashboard</h1>

        <Filters
          users={users}
          searchQuery={searchQuery}
          selectedUserId={selectedUserId}
          sortType={sortType}
          perPage={perPage}
          onSearchChange={handleSearchChange}
          onUserChange={handleUserChange}
          onSortChange={handleSortChange}
          onPerPageChange={handlePerPageChange}
          onResetFilters={resetFilters}
        />

        {isLoading && <p className="message">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {!isLoading && !error && (
          <>
            <p className="counter">Found posts: {filteredPostsCount}</p>

            {currentPosts.length === 0 ? (
              <p className="message">No posts found</p>
            ) : (
              <ul className="posts">
                {currentPosts.map((post) => (
                  <li key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <small>Author: {getUserName(post.userId)}</small>
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
              />
            )}
          </>
        )}
      </div>
  )
}

// class PostsDashboard extends Component {
//   state = {
//     posts: [],
//     users: [],
//     searchQuery: "",
//     selectedUserId: "all",
//     sortType: "newest",
//     currentPage: 1,
//     perPage: 5,
//     isLoading: false,
//     error: null,
//   };

//   componentDidMount() {
//     const savedPerPage = localStorage.getItem("perPage");

//     if (savedPerPage) {
//       this.setState({
//         perPage: Number(savedPerPage),
//       });
//     }

//     this.loadData();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.perPage !== this.state.perPage) {
//       localStorage.setItem("perPage", this.state.perPage);
//     }
//   }

//   loadData = async () => {
//     this.setState({
//       isLoading: true,
//       error: null,
//     });

//     try {
//       const [postsResponse, usersResponse] = await Promise.all([
//         fetch("https://jsonplaceholder.typicode.com/posts"),
//         fetch("https://jsonplaceholder.typicode.com/users"),
//       ]);

//       if (!postsResponse.ok || !usersResponse.ok) {
//         throw new Error("Failed to load data");
//       }

//       const posts = await postsResponse.json();
//       const users = await usersResponse.json();

//       this.setState({
//         posts,
//         users,
//         isLoading: false,
//       });
//     } catch (error) {
//       this.setState({
//         error: error.message,
//         isLoading: false,
//       });
//     }
//   };

//   handleSearchChange = (event) => {
//     this.setState({
//       searchQuery: event.target.value,
//       currentPage: 1,
//     });
//   };

//   handleUserChange = (event) => {
//     this.setState({
//       selectedUserId: event.target.value,
//       currentPage: 1,
//     });
//   };

//   handleSortChange = (event) => {
//     this.setState({
//       sortType: event.target.value,
//       currentPage: 1,
//     });
//   };

//   handlePerPageChange = (event) => {
//     this.setState({
//       perPage: Number(event.target.value),
//       currentPage: 1,
//     });
//   };

//   handlePageChange = (page) => {
//     this.setState({
//       currentPage: page,
//     });
//   };

//   handleNextPage = () => {
//     this.setState((prevState) => ({
//       currentPage: prevState.currentPage + 1,
//     }));
//   };

//   handlePreviousPage = () => {
//     this.setState((prevState) => ({
//       currentPage: prevState.currentPage - 1,
//     }));
//   };

//   resetFilters = () => {
//     this.setState({
//       searchQuery: "",
//       selectedUserId: "all",
//       sortType: "newest",
//       currentPage: 1,
//       perPage: 5,
//     });
//   };

//   getFilteredPosts = () => {
//     const { posts, searchQuery, selectedUserId, sortType } = this.state;

//     let filteredPosts = [...posts];

//     if (searchQuery.trim() !== "") {
//       filteredPosts = filteredPosts.filter((post) =>
//         post.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedUserId !== "all") {
//       filteredPosts = filteredPosts.filter(
//         (post) => post.userId === Number(selectedUserId)
//       );
//     }

//     if (sortType === "newest") {
//       filteredPosts.sort((a, b) => b.id - a.id);
//     }

//     if (sortType === "oldest") {
//       filteredPosts.sort((a, b) => a.id - b.id);
//     }

//     if (sortType === "title-az") {
//       filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
//     }

//     if (sortType === "title-za") {
//       filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
//     }

//     return filteredPosts;
//   };

//   getCurrentPosts = () => {
//     const { currentPage, perPage } = this.state;

//     const filteredPosts = this.getFilteredPosts();

//     const lastIndex = currentPage * perPage;
//     const firstIndex = lastIndex - perPage;

//     return filteredPosts.slice(firstIndex, lastIndex);
//   };

//   getTotalPages = () => {
//     const { perPage } = this.state;

//     return Math.ceil(this.getFilteredPosts().length / perPage);
//   };

//   getUserName = (userId) => {
//     const user = this.state.users.find((user) => user.id === userId);

//     return user ? user.name : "Unknown user";
//   };

//   render() {
//     const {
//       users,
//       searchQuery,
//       selectedUserId,
//       sortType,
//       currentPage,
//       perPage,
//       isLoading,
//       error,
//     } = this.state;

//     const currentPosts = this.getCurrentPosts();
//     const totalPages = this.getTotalPages();
//     const filteredPostsCount = this.getFilteredPosts().length;

//     return (
//       <div className="dashboard">
//         <h1>Posts Dashboard</h1>

//         <Filters
//           users={users}
//           searchQuery={searchQuery}
//           selectedUserId={selectedUserId}
//           sortType={sortType}
//           perPage={perPage}
//           onSearchChange={this.handleSearchChange}
//           onUserChange={this.handleUserChange}
//           onSortChange={this.handleSortChange}
//           onPerPageChange={this.handlePerPageChange}
//           onResetFilters={this.resetFilters}
//         />

//         {isLoading && <p className="message">Loading...</p>}

//         {error && <p className="error">{error}</p>}

//         {!isLoading && !error && (
//           <>
//             <p className="counter">Found posts: {filteredPostsCount}</p>

//             {currentPosts.length === 0 ? (
//               <p className="message">No posts found</p>
//             ) : (
//               <ul className="posts">
//                 {currentPosts.map((post) => (
//                   <li key={post.id} className="post">
//                     <h2>{post.title}</h2>
//                     <p>{post.body}</p>
//                     <small>Author: {this.getUserName(post.userId)}</small>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {totalPages > 1 && (
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={this.handlePageChange}
//                 onNextPage={this.handleNextPage}
//                 onPreviousPage={this.handlePreviousPage}
//               />
//             )}
//           </>
//         )}
//       </div>
//     );
//   }
// }

// export default PostsDashboard;
