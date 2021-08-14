import React, {useCallback, useContext, useEffect, useState} from "react"
import "./cart.scss"
import useHttp from "../../hooks/http.hook";
import Context from "../../context";
import CartCard from "./cart-card";

const CartMain = () => {
    const [cart, setCart] = useState([])
    const { request } = useHttp()
    const { token, userId } = useContext(Context)
    const  fetchInfo = useCallback(async () => {
        try {
            const fetched = await request(`/api/product/cart`, "GET", null, {
                authorization: `bcrypt ${token}`
            })
           setCart(fetched)
        }
        catch (e) {}
    },[request])
    useEffect(() => {
        fetchInfo()
    }, [fetchInfo])
    const buyBtn = cart.length > 0
    return (<div className="container cart-container">
        <div className="cart-content">
            <div className="cart-head">
                <h4> Отложенные товары: {cart.length}</h4>
            </div>
          <div className="cart-body">
              <div className="row">
                  {cart.map((good) => <CartCard key={good.location} info={good} userId={userId}/>)}
              </div>
              <div className="cart-buy-btn">
                  { buyBtn ? <button className="btn">Order products </button> :
                   <div/>}
              </div>
          </div>
        </div>
    </div>)
}

export default CartMain
