import './index.css'

import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import EmptyCart from '../EmptyCart'

export default class Cart extends Component {
  state = {cartList: [], totalPrice: ''}

  placeOrder = () => {
    const {history} = this.props
    history.replace('/payment-success')
    localStorage.removeItem('cartItems')
  }

  componentDidMount = () => {
    this.getLocalStorageData()
  }

  getLocalStorageData = () => {
    const stringifiedData = localStorage.getItem('cartItems')
    const parsedData = JSON.parse(stringifiedData)

    if (parsedData !== null) {
      this.setState({cartList: parsedData})
      const costs = parsedData.map(each => each[0].cost * each.quantity)

      const total = costs.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      )

      this.setState({totalPrice: total})
    }
  }

  render() {
    const {cartList, totalPrice} = this.state

    return (
      <div className="cart-bg-div">
        <Header />
        {cartList.length === 0 ? (
          <EmptyCart a={this.props} />
        ) : (
          <div className="cart-card">
            <div className="cart-iqp-card">
              <h1 className="cart-iqp-h">Item</h1>
              <h1 className="cart-iqp-h">Quantity</h1>
              <h1 className="cart-iqp-h">Price</h1>
            </div>

            <ul className="cart-ul">
              {cartList.map(each => (
                <li className="cart-li">
                  <div className="cart-item">
                    <img
                      className="cart-item-img"
                      src={each[0].imageUrl}
                      alt="img"
                    />
                    <h1 className="cart-item-h">{each[0].name}</h1>
                  </div>

                  <h1 className="cart-item-quantity">{each.quantity}</h1>
                  <h1 className="cart-item-cost">
                    ₹ {each.quantity * each[0].cost}
                  </h1>
                  <div className="sm-h-q-c">
                    <h1 className="sm-cart-item-h">{each[0].name}</h1>
                    <h1 className="sm-cart-item-quantity">{each.quantity}</h1>
                    <h1 className="sm-cart-item-cost">
                      ₹ {each.quantity * each[0].cost}
                    </h1>
                  </div>
                </li>
              ))}
            </ul>

            <hr className="cart-hr" />
            <div className="tot-div">
              <h1 className="total-h">Order Total : </h1>
              <h1 className="total-pr">
                {cartList.length === 0 ? <>₹ 00</> : <> ₹ {totalPrice} </>}
              </h1>
            </div>
            {cartList.length === 0 ? (
              <button className="place-order-btn" type="button">
                Place Order
              </button>
            ) : (
              <button
                onClick={this.placeOrder}
                className="place-order-btn"
                type="button"
              >
                Place Order
              </button>
            )}
          </div>
        )}

        <Footer />
      </div>
    )
  }
}
