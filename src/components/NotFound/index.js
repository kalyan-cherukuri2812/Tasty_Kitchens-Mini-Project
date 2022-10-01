import './index.css'

const NotFound = props => {
  console.log(props)
  const homePageClick = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="notfound-div">
      <img
        src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664625482/Group_vrknux.png"
        alt="img"
      />
      <h1 className="notfound-h">Page Not Found</h1>
      <h1 className="notfound-h2">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </h1>
      <button onClick={homePageClick} className="notfound-btn" type="button">
        Home Page
      </button>
    </div>
  )
}

export default NotFound
