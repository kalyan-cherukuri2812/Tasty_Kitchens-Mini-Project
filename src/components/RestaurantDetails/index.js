import './index.css'

import {Component} from 'react'
import {AiTwotoneStar} from 'react-icons/ai'
import ScaleLoader from 'react-spinners/ScaleLoader'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItems'

class RestaurantDetails extends Component {
  state = {restaurantData: {}, foodItemList: [], loader: true}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const CookiesData = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CookiesData}`,
      },
    }
    const response = await fetch(url, options)
    const respData = await response.json()

    if (response.ok) {
      const data = {
        costForTwo: respData.cost_for_two,
        cuisine: respData.cuisine,
        id: respData.id,
        imageUrl: respData.image_url,
        itemsCount: respData.items_count,
        location: respData.location,
        name: respData.name,
        opensAt: respData.opens_at,
        rating: respData.rating,
        reviewsCount: respData.reviews_count,
      }

      const foodData = respData.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))

      this.setState({
        restaurantData: data,
        foodItemList: foodData,
        loader: false,
      })
    }
  }

  render() {
    const {restaurantData, foodItemList, loader} = this.state

    return (
      <div>
        <Header />
        <div className="rest-name-bg-card">
          <div className="rest-id-details-div">
            <img
              className="rest-id-img"
              src={restaurantData.imageUrl}
              alt="img"
            />
            <div className="rest-id-name-add-div">
              <h1 className="rest-id-name">{restaurantData.name}</h1>
              <h1 className="rest-id-cuisine">{restaurantData.cuisine}</h1>
              <h1 className="rest-id-location">{restaurantData.location}</h1>
              <div className="rest-id-rating-cost-div">
                <div className="rest-id-rating-div">
                  <h1 className="rest-id-rating-h1">
                    <AiTwotoneStar /> {restaurantData.rating}
                  </h1>
                  <h1 className="rest-id-rating-h2">
                    {restaurantData.reviewsCount} ratings
                  </h1>
                </div>
                <hr className="rest-id-rating-cost-hr" />
                <div className="rest-id-cost-div">
                  <h1 className="rest-id-rating-h1">
                    ₹ {restaurantData.costForTwo}
                  </h1>
                  <h1 className="rest-id-rating-h2">Cost for two</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loader ? (
          <div className="loader">
            <ScaleLoader color="#F7931E" />
          </div>
        ) : (
          <ul className="food-item-ul">
            {foodItemList.map(each => (
              <FoodItem
                key={each.id}
                foodItem={each}
                foodItemList={foodItemList}
              />
            ))}
          </ul>
        )}

        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
