import './index.css'

import Header from '../Header'

const PaymentSuccessFull = props => {
  const goToHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <>
      <div>
        <Header />
        <div className="payment-div">
          <img
            src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664607537/Vector_3_uvgo7n.png"
            alt="img"
          />
          <h1 className="payment-h">Payment Successful</h1>
          <h1 className="payment-h2">
            Thank you for ordering <br /> Your payment is successfully
            completed.
          </h1>
          <button onClick={goToHomePage} className="payment-btn" type="button">
            Go To Home Page
          </button>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccessFull
