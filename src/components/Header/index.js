import './index.css'

import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GoThreeBars} from 'react-icons/go'
import {IoMdCloseCircle} from 'react-icons/io'

class Header extends Component {
  state = {sm3barStatus: false, home: '', cart: ''}

  homeClick = () => {
    const {history} = this.props
    history.replace('/')
  }

  cartClick = () => {
    const {history} = this.props
    history.replace('/cart')
  }

  componentDidMount = () => {
    this.path()
  }

  path = () => {
    const {history} = this.props
    if (history.location.pathname === '/cart') {
      this.setState({home: false, cart: true})
    } else {
      this.setState({home: true})
      this.setState({cart: false})
    }
  }

  sm3BarOpenClose = () => {
    this.setState(prev => ({sm3barStatus: !prev.sm3barStatus}))
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {sm3barStatus, home, cart} = this.state

    return (
      <>
        <div className="header-div">
          <div className="header-card-1">
            <img
              onClick={this.homeClick}
              className="header-c1-img"
              src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029743/Group_7420_r0ezka.svg"
              alt="img"
            />
            <h1 onClick={this.homeClick} className="header-c1-h">
              Tasty Kitchens
            </h1>
          </div>
          <div className="header-card-2">
            <h1
              onClick={this.homeClick}
              className={home ? 'header-c2-h act' : 'header-c2-h'}
            >
              Home
            </h1>
            <h1
              onClick={this.cartClick}
              className={cart ? 'header-c2-h act' : 'header-c2-h'}
            >
              Cart
            </h1>
            <button
              onClick={this.logout}
              className="header-c2-btn"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="sm-header-div">
          <div className="sm-header-card-1">
            <img
              onClick={this.homeClick}
              className="sm-header-c1-img"
              src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029743/Group_7420_r0ezka.svg"
              alt="img"
            />
            <h1 onClick={this.homeClick} className="header-c1-h">
              Tasty Kitchens
            </h1>
          </div>
          <GoThreeBars className="GoThreeBars" onClick={this.sm3BarOpenClose} />
        </div>
        {sm3barStatus ? (
          <div className="sm-header-hamb-click-div">
            <div className="sm-h-c-l-div">
              <h1
                onClick={this.homeClick}
                className={home ? 'sm-header-c2-h sm-act' : 'sm-header-c2-h '}
              >
                Home
              </h1>
              <h1
                onClick={this.cartClick}
                className={cart ? 'sm-header-c2-h sm-act' : 'sm-header-c2-h '}
              >
                Cart
              </h1>
              <button
                onClick={this.logout}
                className="sm-header-c2-button"
                type="button"
              >
                Logout
              </button>
            </div>
            <IoMdCloseCircle
              className="sm-header-IoMdCloseCircle"
              onClick={this.sm3BarOpenClose}
            />
          </div>
        ) : null}
      </>
    )
  }
}

export default withRouter(Header)
