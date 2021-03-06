import React, { Component } from "react";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";
import { Route } from "react-router-dom";
import BookmarksContext from './BookmarksContext/BookmarksContext';
import Rating from './Rating/Rating'



class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };
  deleteBookmark = bookmarkId => {
        const newBookmarks = this.state.bookmarks.filter(bm =>
          bm.id !== bookmarkId
        )
      this.setState({
         bookmarks: newBookmarks
      })
      }
  setBookmarks = (bookmarks) => {
    this.setState({
      bookmarks,
      error: null,
      page: "list",
    });
  };

  addBookmark = (bookmark) => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch((error) => this.setState({ error }));
  }

  render() {
    const contextValue = {
             bookmarks: this.state.bookmarks,
             addBookmark: this.addBookmark,
             deleteBookmark: this.deleteBookmark,
           }
    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        <Rating value="hello"/>
        <BookmarksContext.Provider value={contextValue}>
           <Nav />
           <div className='content' aria-live='polite'>
          <Route
            path="/add-bookmark"
            component={AddBookmark}
          />
          <Route
            exact
            path="/"
            component={BookmarkList}
          />
          </div>
         </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
