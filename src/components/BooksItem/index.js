import './index.css'
import {Link} from 'react-router-dom'
const BooksItem = props => {
  const {item} = props

  const {coverPic, authorName, rating, readStatus, title, id} = item
  return (
    <Link to={`/book-details/${id}`}>
      <li className="books-item">
        <img className="books-img" src={coverPic} />
        <div className="books-item-details">
          <h5 id="#h" className="h5">
            {title}
          </h5>

          <p className="para">{authorName}</p>
          <p className="p">Avg.Rating :{rating}</p>
          <p className="p">status : {readStatus}</p>
        </div>
      </li>
    </Link>
  )
}

export default BooksItem
