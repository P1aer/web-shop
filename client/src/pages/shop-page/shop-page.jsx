import React, {useCallback, useContext, useEffect, useState} from "react"
import "./shop-page.scss"
import useHttp from "../../hooks/http.hook";
import Loader from "../../Loader/loader";
import Context from "../../context";
import Card from "./card";

const ShopMain = () => {
    const [ goods, setGoods] = useState([])
    const {loading, request } = useHttp()
    const { token } = useContext(Context)
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
    return (<div className="container shop-page">
        <div className="row">
        {goods.map((good) => <Card key={good.name} good={good}/> )}
        </div>
    </div>)
}

export default ShopMain
