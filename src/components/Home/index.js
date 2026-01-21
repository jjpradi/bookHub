import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
import BookItem from '../BookItem'

let settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500,
  dots: true,
}

class Home extends Component {
  state = {
    topBooks: [],
    currentBooks: [],
    apiStatus: apiConstant.initial,
    isError: false,
  }

  componentDidMount() {
    this.getBooks()
  }

  tryAgain = () => {
    this.setState({apiStatus: apiConstant.initial})
    this.getBooks()
  }
  failureView = () => {
    this.setState({
      apiStatus: apiConstant.failure,
    })
  }
  successView = data => {
    const filteredList = data.books.map(e => ({
      authorName: e.author_name,
      coverPic: e.cover_pic,
      id: e.id,
      title: e.title,
    }))

    this.setState({
      topBooks: filteredList,
      currentBooks: filteredList.slice(0, 3),
      apiStatus: apiConstant.success,
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

    try {
      const response = await fetch(
        'https://apis.ccbp.in/book-hub/top-rated-books',

        options,
      )
      console.log(response)
      const data = await response.json()

      if (response.ok === true) {
        this.successView(data)
      } else {
        this.setState({isError: true})
      }
    } catch (e) {
      this.failureView()
    }
  }

  renderLoader = () => {
    return (
      <div className="bg">
        <Loader type="ThreeDots" color="#000000" />
      </div>
    )
  }

  onNext = () => {
    console.log(this.props)

    const {topBooks, currentBooks} = this.state
    console.log(topBooks, currentBooks)

    const newIndex = topBooks.findIndex(
      e => e.id === currentBooks[currentBooks.length - 1].id,
    )

    console.log(newIndex)
    if (newIndex + 1 !== topBooks.length) {
      this.setState({
        currentBooks: topBooks.slice(newIndex + 1, newIndex + 4),
      })
    }
  }

  onPrev = () => {
    const {topBooks, currentBooks} = this.state
    console.log(topBooks, currentBooks)
    const newIndex = topBooks.findIndex(
      e => e.id === currentBooks[currentBooks.length - 1].id,
    )

    console.log(newIndex)

    if (newIndex !== 3) {
      this.setState({
        currentBooks: topBooks.slice(newIndex - 4, newIndex - 1),
      })
    }
  }

  renderSuccess = () => {
    const {topBooks, apiStatus, currentBooks, isError} = this.state

    return (
      <div className="home-page">
        <div>
          <h1>Find Your Favourite Books?</h1>

          <p>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
        </div>

        <div className="books-bg">
          <div className="top-books-header">
            <h1>Top Books</h1>

            <div>
              <button>Find Books</button>
            </div>
          </div>
          <div>
            {isError ? (
              this.renderFailure()
            ) : (
              <div className="home-books-container">
                <button className="prev-butt" onClick={this.onPrev}>
                  <img
                    className="next-button"
                    src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768979021/Frame_1444_bp6v25.png"
                  />
                </button>
                <ul className="top-books-list">
                  {currentBooks.map(e => (
                    <BookItem item={e} />
                  ))}
                </ul>
                <button className="next-butt" onClick={this.onNext}>
                  <img
                    className="next-button"
                    src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768962564/Frame_1445_lawiex.png"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  renderFailure = () => {
    return (
      <div className="bg">
        <img
          className="error-image"
          src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897944/Group_7522_ywwtft.png"
        />

        <p>Please went wrong, Please try again</p>
        <button onClick={this.tryAgain}> Try Again</button>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderSuccess()

      case 'FAILURE':
        return this.renderFailure()
    }
  }
}

export default Home
