import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
class BookDetails extends Component {
  state = {bookDetails: {}}
  componentDidMount() {
    this.getDetails()
  }

  successView = data => {
    const e = data.book_details
    const filteredlist = {
      aboutAuthor: e.about_author,
      aboutBook: e.about_book,
      authorName: e.author_name,
      coverPic: e.cover_pic,
      readStatus: e.read_status,
      title: e.title,
      rating: e.rating,
    }

    this.setState({bookDetails: filteredlist})
  }

  failureView = () => {}

  getDetails = async () => {
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',

      headers: {
        Authorization: `bearer: ${jwtToken}`,
      },
    }

    const {match} = this.props

    console.log(match.params)

    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books/${match.params.id}`,
      options,
    )
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.successView(data)
    } else {
      this.failureView(data)
    }
    console.log(data)
  }
  render() {
    const {bookDetails} = this.state

    const {
      authorName,
      coverPic,
      readStatus,
      title,
      rating,
      aboutBook,
      aboutAuthor,
    } = bookDetails
    return (
      <div className="bg">
        <div className="book-details">
          <div className="book-info">
            <img className="books-img" src={coverPic} />

            <div>
              <h5>{title}</h5>
              <p>{authorName}</p>
              <p>
                Avg.Rating
                <img
                  className="star-logo"
                  src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768836317/Icon_xztmit.png"
                />
                {rating}
              </p>
              <p>
                status : <span className="span-item">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h1>About Author</h1>
            <p>{aboutAuthor}</p>
          </div>
          <div>
            <h1>About Book</h1>
            <p>{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetails
