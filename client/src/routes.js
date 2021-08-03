import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Navbar from "./Navbar/navbar";
import ShopMain from "./pages/shop-page/shop-page";
import ProfileMain from "./pages/profile/profile-page";
import CartMain from "./pages/cart-page/cart-page";
import AuthPage from "./pages/auth-page/auth-page";

const useRoutes = isAuth => {
    if (isAuth){
        return (
            <Switch>
                <Route exact path={"/"}>
                    <Navbar/>
                    <ShopMain/>
                </Route>
                <Route path={"/cart"}>
                    <Navbar/>
                    <CartMain/>
                </Route>
                <Route path={"/profile"}>
                    <Navbar/>
                    <ProfileMain/>
                </Route>
                <Redirect to={"/"}/>
            </Switch>
        )
    }
    return (
        <Switch>
             <Route exact path={"/"}>
               <AuthPage/>
             </Route>
            <Redirect to={"/"}/>
        </Switch>
    )
}

export default useRoutes;
