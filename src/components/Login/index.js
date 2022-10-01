import './index.css'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

export default class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    errorMsg: '',
    showpasswordStatus: false,
  }

  showPassword = event => {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.setState({showpasswordStatus: true})
    } else {
      this.setState({showpasswordStatus: false})
    }
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  loginClick = event => {
    event.preventDefault()
    this.getData()
  }

  getData = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const respData = await response.json()
    console.log(respData)
    if (response.ok) {
      Cookies.set('jwt_token', respData.jwt_token, {expires: 30})
      const {history} = this.props
      console.log(history)
      history.replace('/')
      this.setState({errorMsg: ''})
    } else {
      this.setState({errorMsg: respData.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg, showpasswordStatus} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-bg-container">
          <div className="login-card-1">
            <form className="form" onSubmit={this.loginClick}>
              <img
                className="login-icon"
                src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029743/Group_7420_r0ezka.svg"
                alt="img"
              />
              <h1 className="login-tasty-h">Tasty Kitchens</h1>
              <h1 className="login-h">Login</h1>
              <div className="input-div">
                <label className="login-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  value={username}
                  onChange={this.usernameChange}
                  className="login-input"
                  id="username"
                  type="text"
                />
              </div>
              <div className="input-div">
                <label className="login-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  value={password}
                  onChange={this.passwordChange}
                  className="login-input"
                  id="password"
                  type={showpasswordStatus ? 'text' : 'password'}
                />
              </div>
              <div className="show-password-div">
                <input
                  onChange={this.showPassword}
                  className="check-input"
                  id="showpassword"
                  type="checkbox"
                />
                <label className="check-input-label" htmlFor="showpassword">
                  Show Password
                </label>
              </div>

              <p className="login-err-msg">{errorMsg}</p>
              <button className="login-btn" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="login-card-2">
            <img
              className="login-img"
              src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029007/Rectangle_1456_2_dmsuna.jpg"
              alt="img"
            />
          </div>
        </div>

        <div className="sm-login-bg">
          <img
            className="sm-login-img"
            src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029007/Rectangle_1456_2_dmsuna.jpg"
            alt="img"
          />
          <h1 className="sm-login-h">Login</h1>
          <form className="sm-form" onSubmit={this.loginClick}>
            <div className="input-div">
              <label className="login-label" htmlFor="username">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.usernameChange}
                className="login-input"
                id="username"
                type="text"
              />
            </div>
            <div className="input-div">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={this.passwordChange}
                className="login-input"
                id="password"
                type={showpasswordStatus ? 'text' : 'password'}
              />
            </div>
            <div className="show-password-div">
              <input
                onChange={this.showPassword}
                className="check-input"
                id="showpassword"
                type="checkbox"
              />
              <label className="check-input-label" htmlFor="showpassword">
                Show Password
              </label>
            </div>

            <p className="login-err-msg">{errorMsg}</p>
            <button className="sm-login-btn login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}
