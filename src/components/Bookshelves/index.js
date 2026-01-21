import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import Loader from 'react-loader-spinner'

import {IoMdSearch} from 'react-icons/io'
import BooksItem from '../BooksItem'
import {Redirect} from 'react-router-dom'
const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  error: 'ERROR',
}
const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
class Bookshelves extends Component {
  state = {
    searchInput: '',
    booksList: [],
    bookshelfName: bookshelvesList[0].value,
    bookshelfLabel: bookshelvesList[0].label,

    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  somethingWrong = error => {
    this.setState({
      apiStatus: apiConstants.error,
    })
  }

  renderError = () => {
    return (
      <div className="bg">
        <img src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897944/Group_7522_ywwtft.png" />

        <p>Please went wrong, Please try again</p>
        <button onClick={this.tryAgain}> Try Again</button>
      </div>
    )
  }

  onLabel = event => {
    console.log(event.target.id)
    const newValue = bookshelvesList.filter(e => e.id === event.target.id)[0]

    console.log(newValue)

    this.setState(
      {
        bookshelfName: newValue.value,
        bookshelfLabel: newValue.label,
      },
      this.getBooks,
    )
  }

  onName = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  noBooksView = () => {}

  successView = data => {
    console.log(data)

    const filteredList = data.books.map(e => ({
      authorName: e.author_name,

      coverPic: e.cover_pic,
      rating: e.rating,
      readStatus: e.read_status,
      title: e.title,
      id: e.id,
    }))

    this.setState({booksList: filteredList, apiStatus: apiConstants.success})
  }

  failureView = () => {
    this.setState({
      apiStatus: apiConstants.failure,
    })
  }

  getBooks = async () => {
    const jwtToken = Cookies.get('jwtToken')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer: ${jwtToken}`,
      },
    }

    const {bookshelfName, searchInput} = this.state
    try {
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books/?shelf=${bookshelfName}&search=${searchInput}`,
        options,
      )

      const data = await response.json()
      console.log(response)

      if (response.ok == true) {
        this.successView(data)
      } else {
        this.failureView(data)
      }
      console.log(data)
    } catch (e) {
      console.log(e)
      this.somethingWrong(e)
    }
  }

  onSearch = () => {
    const {searchInput} = this.state
    this.getBooks()
  }

  renderFailure = () => {
    return (
      <div className="bg">
        <img src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897944/Group_7522_ywwtft.png" />

        <p>Please went wrong, Please try again</p>
        <button onClick={this.tryAgain}> Try Again</button>
      </div>
    )
  }

  renderResult = () => {
    const {booksList, bookshelfLabel, bookshelfName, searchInput} = this.state

    return (
      <div className="book-shelve">
        <ul className="shelve-list">
          <h1>Bookshelves</h1>

          {bookshelvesList.map(e => (
            <li
              className={e.value === bookshelfName ? 'selected' : 'non'}
              onClick={this.onLabel}
              id={e.id}
              value={e.value}
            >
              {e.label}
            </li>
          ))}
        </ul>

        <div className="books-cont">
          <div className="book-search">
            <h1 className="bookshelf-label">{bookshelfLabel} Books</h1>
            <div>
              <div className="search-box">
                <input
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onName}
                  value={searchInput}
                  type="text"
                />

                <IoMdSearch onClick={this.onSearch} size={21} />
              </div>
            </div>
          </div>

          <ul className="book-shelves-list">
            {bookshelvesList.map(e => (
              <button
                onClick={this.onLabel}
                id={e.id}
                value={e.value}
                className={
                  e.value === bookshelfName
                    ? 'selected-book-shelve'
                    : 'non-selected-book-shelve'
                }
              >
                {e.label}
              </button>
            ))}
          </ul>
          {booksList.length === 0 ? (
            <div className="no-result-view">
              <img
                className="no-img"
                src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768895924/Asset_1_1_h0mr0a.png"
              />
              <p>Your Search {searchInput} for did not find any matches</p>
            </div>
          ) : (
            <ul className="books-list">
              {booksList.map(e => (
                <BooksItem item={e} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  renderLoader = () => {
    return (
      <div className="bg">
        <Loader type="ThreeDots" color="lightblue" />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderResult()

      case 'FAILURE':
        return this.renderFailure()

      case 'ERROR':
        return this.renderError()
    }
  }
}

export default Bookshelves
