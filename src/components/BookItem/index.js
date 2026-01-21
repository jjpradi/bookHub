import './index.css'

const BookItem = props => {
  const {item} = props

  const {title, authorName, coverPic} = item
  return (
    <li className="single-book-item">
      <img className="cover-pic" src={coverPic} />

      <h5>{title}</h5>

      <p>{authorName}</p>
    </li>
  )
}

export default BookItem
