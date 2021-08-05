import React, {useCallback, useEffect, useState} from "react"
import "./shop-page.scss"
import useHttp from "../../hooks/http.hook";
import Loader from "../../Loader/loader";

const ShopMain = () => {
    const [ goods, setGoods] = useState([])
    const {loading, request } = useHttp()
    const  fetchGoods = useCallback(async () => {
        try {
            const fetched = await request("/api/product/", "GET")
            setGoods(fetched)
        }
        catch (e) {

        }
    },[request])
    useEffect(() => {
        fetchGoods()
    }, [fetchGoods])
    if (loading) {
        return <Loader/>
    }
    console.log(goods[0])
    return (<div className="container shop-page">
        <div className="row">
        {goods.map((good) =>
            <div key={good.name} className="col s1 m2">
                <div className="card card-shop">
                    <div className="card-image">
                        <img src={good.image} alt={good.name}/>
                    </div>
                    <div className="card-content">
                        <span className="card-title">{good.name}</span>
                        <p> {good.price} Rub</p>
                    </div>
                </div>
            </div>
        )}
        </div>
    </div>)
}

export default ShopMain
