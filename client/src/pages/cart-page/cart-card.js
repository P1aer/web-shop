import React, {useState} from "react"
import useHttp from "../../hooks/http.hook";

const CartCard = ({  info, userId }) => {
    const [amount, setAmount] = useState(info.amount)
    const { request } = useHttp()
    const amountHandler =async (dir) => {
        try {
            const value = dir ? amount + 1 : amount - 1
            if (value < 0) return
            await request("/api/product/change","PUT", { product: info.location._id, value, userId })
            setAmount(value)
        }
        catch (e) {}
    }
    return (
        <div key={info.location.name} className="col s1 m2">
            <div className="card card-shop">
                <div className="card-image">
                    <img src={info.location.image} alt={info.location.name}/>
                </div>
                <div className="card-content">
                    <span className="card-title">{info.location.name}</span>
                    <p> {info.location.price} Rub</p>
                </div>
                <div className="card-footer">
                    <button onClick={() => amountHandler(false)} className="minus-btn">−</button>
                    <div className="counter"><p>{amount}</p></div>
                    <button onClick={() => amountHandler(true)} className="plus-btn">+</button>
                </div>
            </div>
        </div>
    )
}

export default CartCard
