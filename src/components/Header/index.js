import {Link} from 'react-router-dom'
import './index.css'

import {Popup} from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
const Header = props => {
  console.log(props)
  return (

    
    <nav className="header">
      <img
        className="book-logo"
        src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768811821/Group_7731_cx4tmt.png"
      />
      <div className="popup">
        <Popup
          className="hamburger"
          trigger={
            <img src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768986821/menu_1_rtvc1w.png" />
          }

          position="bottom right"

        >
          {close =()=> (
            <ul className="nav-header-list">
              <Link className="li" to="/">
                <li
                  className={
                    props.location.pathname === '/' ? 'selected' : null
                  }
                >
                  Home
                </li>
              </Link>

              <Link className="li" to="/bookshelves">
                <li
                  className={
                    props.location.pathname === '/bookshelves'
                      ? 'selected'
                      : null
                  }
                >
                  Bookshelves
                </li>
              </Link>

              <Link className="li" to="/login">
                <li className="">
                  <button className="logout-button">Logout</button>
                </li>
              </Link>
            </ul>
          
          
          )
          
          }
        </Popup>
      </div>

      <ul className="header-list">
        <Link className="li" to="/">
          <li className={props.location.pathname === '/' ? 'selected' : null}>
            Home
          </li>
        </Link>
        <Link className="li" to="/bookshelves">
          <li
            className={
              props.location.pathname === '/bookshelves' ? 'selected' : null
            }
          >
            Bookshelves
          </li>
        </Link>
        <Link className="li" to="/login">
          <li className="">
            <button className="logout-button">Logout</button>
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
