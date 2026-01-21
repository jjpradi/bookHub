import {Redirect, withRouter} from 'react-router-dom'
import "./index.css"
const NotFound = props => {
  const onHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found">
      <div className="bg">
        <img src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897238/Group_7484_wiooal.png" />

        <p>Page Not Found</p>
        <p>
          we are sorry, the page you requested could not be found,Please go back
          to the homepage.
        </p>
        <button onClick={onHome}> Home</button>
      </div>
    </div>
  )
}

export default withRouter(NotFound)
