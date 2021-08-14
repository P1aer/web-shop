import React, {useContext, useState} from "react"
import Context from "../../context";
import useHttp from "../../hooks/http.hook";

const Card = ( { good } ) => {
    const [added, setAdd] = useState(false)
    const { token } = useContext(Context)
    const { request } = useHttp()
    const auth = React.useContext(Context)
    const clickHandler = async (productId) => {
        try {
            await request("/api/product/addCart", "POST", { productId },{
                authorization: `becrypt ${token}`
            })
            setAdd(true)
        } catch (e) {
            auth.logout()
        }
    }
    return  <div key={good.name} className="col s1 m2">
        <div className="card card-shop">
            <div className="card-image">
                <img src={good.image} alt={good.name}/>
            </div>
            <div className="card-content">
                <span className="card-title">{good.name}</span>
                <p> {good.price} Rub</p>
            </div>
            <div className="card-footer">
                { !added ? <button onClick={() => clickHandler(good._id)} className="btn">Add to Cart</button>
                    : <i className="material-icons">check</i>}
            </div>
        </div>
    </div>
}

export default Card
