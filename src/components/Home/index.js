import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BsFilterLeft} from 'react-icons/bs'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Header from '../Header'
import Footer from '../Footer'

export default class Home extends Component {
  state = {
    loader: true,
    offersList: [],
    list: [],
    pageCount: 1,
    offSet: 0,
    filter: 'Highest',
  }

  filterChange = event => {
    console.log(event.target.value)
    this.setState({filter: event.target.value}, this.getData)
  }

  decrement = () => {
    const {pageCount} = this.state
    if (pageCount >= 2) {
      this.setState(prev => ({pageCount: prev.pageCount - 1, loader: true}))
      this.setState(prev => ({offSet: prev.offSet - 9}), this.getData)
    }
  }

  increment = () => {
    const {pageCount} = this.state

    if (pageCount <= 3) {
      this.setState(prev => ({pageCount: prev.pageCount + 1, loader: true}))
      this.setState(prev => ({offSet: prev.offSet + 9}), this.getData)
    }
  }

  componentDidMount = () => {
    this.getData()
    this.getImages()
  }

  getImages = async () => {
    const cookiesData = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookiesData}`,
      },
    }
    const response = await fetch(url, options)
    const respData = await response.json()
    console.log(response)
    console.log(respData)

    if (response.ok) {
      const data = respData.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({offersList: data})
    }
  }

  getData = async () => {
    const {offSet, filter} = this.state
    const cookiesData = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offSet}&limit=9&sort_by_rating=${filter}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookiesData}`,
      },
    }
    const response = await fetch(url, options)
    const respData = await response.json()

    console.log(respData.restaurants)
    if (response.ok) {
      const data = respData.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      }))

      this.setState({list: data, loader: false})
    }
  }

  render() {
    const {loader, offersList, list, pageCount} = this.state
    const {sortByOptions} = this.props
    console.log(offersList)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <>
        <div className="home-bg-card ">
          <Header />
          <Slider className="slider" {...settings}>
            {offersList.map(each => (
              <img className="home-img" src={each.imageUrl} alt="img" />
            ))}
          </Slider>
        </div>
        <div className="popular-rest-card">
          <h1 className="popular-rest-h">Popular Restaurants</h1>
          <div className="rest-p-fil-div">
            <p className="res-sel-p">
              Select your favorite restaurant special dish and make your day
              happy...
            </p>
            <div className="filter-rest">
              <BsFilterLeft className="rest-fil-icon" />
              <select onChange={this.filterChange} className="rest-select-tag">
                {sortByOptions.map(each => (
                  <option key={each.id} value={each.value}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="home-hr" />

          {loader ? (
            <div className="loader">
              <ScaleLoader color="#F7931E" />
            </div>
          ) : (
            <ul className="rest-ul">
              {list.map(each => (
                <Link className="link" to={`/restaurant/${each.id}`}>
                  <li key={each.id} className="rest-li">
                    <img
                      className="li-rest-img"
                      src={each.imageUrl}
                      alt="img"
                    />
                    <div className="li-name-div">
                      <h1 className="li-rest-h">{each.name.slice(0, 17)}</h1>
                      <h1 className="li-rest-cui">{each.cuisine}</h1>
                      <div className="li-rating-div">
                        <AiFillStar className="li-start-icon" />
                        <h1 className="li-rest-rating">{each.rating}</h1>
                        <h1 className="li-rest-tot-rev">
                          ({each.totalReviews} ratings)
                        </h1>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}

          <div className="rest-page-count-div">
            <IoIosArrowBack
              onClick={this.decrement}
              className="rest-arrow-icon"
            />
            <h1 className="rest-page-count">{pageCount} of 4</h1>
            <IoIosArrowForward
              onClick={this.increment}
              className="rest-arrow-icon"
            />
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
