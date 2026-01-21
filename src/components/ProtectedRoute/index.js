import Cookies from 'js-cookie'
import Header from '../Header'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwtToken')
  console.log(jwtToken)
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header />
      <Route {...props} />
    </div>
  )
}

export default ProtectedRoute
