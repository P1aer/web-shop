import React from "react"
import useHttp from "../../hooks/http.hook";
import useMessage from "../../hooks/message.hook";
import Context from "../../context";

const AuthPage = () => {
    const auth = React.useContext(Context)
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp()
    const [form,setForm] = React.useState({
        email:"", password: ""
    })
    const changeHandler = event => {
        setForm({...form,[event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
          const data = await request("/api/auth/register","POST", {...form})
            console.log(data)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login","POST", {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    React.useEffect(() => {
      message(error)
        clearError()
    },[error,message,clearError])
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1> My shop </h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input onChange={changeHandler} id="email"
                                       placeholder="Введите mail"
                                       name="email"
                                       value={form.email}
                                       type="text"/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input id="password" onChange={changeHandler}
                                       placeholder="Введите password"
                                       name="password"
                                       value={form.password}
                                       type="password"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={loginHandler} className="btn  deep-orange lighten-1">Войти</button>
                        <button onClick={registerHandler} className="btn black-text ">Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
