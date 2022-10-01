import './App.css'

import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import PaymentSuccessFull from './components/Paymentsuccessfull'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute
      exact
      path="/"
      component={() => <Home sortByOptions={sortByOptions} />}
    />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute
      exact
      path="/payment-success"
      component={PaymentSuccessFull}
    />
    <Route component={NotFound} />
  </Switch>
)

export default App
