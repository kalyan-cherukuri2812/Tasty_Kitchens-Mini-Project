import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiTwotoneStar} from 'react-icons/ai'

export default class FoodItem extends Component {
  state = {quantity: 1, addbtnStatus: false}

  goTOCart = () => {
    console.log(this.props)
  }

  onIncrement = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity >= 2) {
      this.setState(prev => ({quantity: prev.quantity - 1}))
    }
  }

  componentDidMount = () => {
    this.getLocalStorageData()
  }

  getLocalStorageData = () => {
    const stringifiedData = localStorage.getItem('cartItems')
    const parsedData = JSON.parse(stringifiedData)

    if (parsedData === null) {
      return []
    }
    return parsedData
  }

  addItem = id => {
    const {quantity} = this.state
    const {foodItemList} = this.props
    console.log(foodItemList)
    const addItemData = foodItemList.filter(each => each.id === id)
    const foodItem = {...addItemData, quantity}

    const storageData = this.getLocalStorageData()
    const cartList = [...storageData, foodItem]

    localStorage.setItem('cartItems', JSON.stringify(cartList))
    this.setState({addbtnStatus: true})
  }

  render() {
    const {foodItem} = this.props
    const {quantity, addbtnStatus} = this.state
    return (
      <li className="food-item-li">
        <img className="food-item-img" src={foodItem.imageUrl} alt="img" />
        <div className="food-item-name-pr-div">
          <h1 className="food-item-name">{foodItem.name}</h1>
          <h1 className="food-item-cost">₹ {foodItem.cost}</h1>
          <h1 className="food-item-rating">
            <AiTwotoneStar className="food-item-rating-star" />{' '}
            {foodItem.rating}
          </h1>
          <div className="add-qu-div">
            {addbtnStatus ? (
              <Link to="/cart">
                <button className="food-item-add-btn" type="button">
                  CART
                </button>
              </Link>
            ) : (
              <button
                onClick={() => this.addItem(foodItem.id)}
                className="food-item-add-btn"
                type="button"
              >
                ADD
              </button>
            )}

            <div className="counter-div">
              <button
                className="counter-btn"
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <h1 className="counter-num">{quantity}</h1>
              <button
                className="counter-btn"
                type="button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
