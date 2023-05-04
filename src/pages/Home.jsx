import {Link} from "react-router-dom"
function Home(){
 
    return(
        <div>
            <div><Link to='/todoApp'>Todo App</Link></div>
            <div><Link to='/weatherApp'>Weather App</Link></div>
            <div><Link to='/userInfo'>User Info</Link></div>
        </div>
    )
}

export default Home;