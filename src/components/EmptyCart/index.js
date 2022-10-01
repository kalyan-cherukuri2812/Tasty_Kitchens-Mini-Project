import './index.css'

const EmptyCart = props => {
  const {a} = props
  const orderNow = () => {
    const {history} = a

    history.replace('/')
  }

  return (
    <div className="empty-cart-div">
      <img
        className="empty-cart-img"
        src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664614760/OBJECTS_obsuby.png"
        alt="img"
      />
      <h1 className="empty-cart-h">No Orders Yet!</h1>
      <h1 className="empty-cart-p">
        Your cart is empty. Add something from the menu.
      </h1>
      <button onClick={orderNow} className="empty-cart-btn" type="button">
        Order Now
      </button>
    </div>
  )
}

export default EmptyCart
