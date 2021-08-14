import React, {useCallback, useContext, useEffect, useState} from "react"
import "./profile.scss"
import useHttp from "../../hooks/http.hook";
import Loader from "../../Loader/loader";
import Context from "../../context";
import useMessage from "../../hooks/message.hook";


const ProfileMain = () => {
    const [user, setInfo] = useState("")
    const [edit, setEdit] = useState(false)
    const [form,setForm] = React.useState({
        email:""
    })
    const {loading, request, clearError, error } = useHttp()
    const message = useMessage();
    const { logout, token, userId } = useContext(Context)
    const  fetchInfo = useCallback(async () => {
        try {
            const fetched = await request(`/api/auth/${userId}`, "GET")
            setInfo(fetched)
        }
        catch (e) {}
    },[request])
    useEffect(() => {
        fetchInfo()
    }, [fetchInfo])
    useEffect(() => {
        message(error)
        clearError()
    },[error,message,clearError])
    const deleteHandler = async () => {
        try {
            await request("/api/auth/delete", "DELETE", null,{
                authorization: `becrypt ${token}`
            })
            logout()
        } catch (e) {
        }
    }
    const changeHandler = event => {
        setForm({...form,[event.target.name]: event.target.value})
    }
    const editHandler = async () => {
        try {
            const data = await request("/api/auth/update", "PUT", { email: form.email }, {
                authorization: `becrypt ${token}`
            })
            console.log(data)
            setInfo(data)
            setEdit(false);
            setForm({email: ""})
        } catch (e) {
        }
    }

    if (loading) {
        return <Loader/>
    }
    const elems = document.querySelectorAll('.modal');
    const instances = window.M.Modal.init(elems)
    return (<div className="container profile-container">
        <div className="profile-content">
            <div className="profile-info">
                <div className="profile-block">
                    <div className="profile-block-info">
                        {
                            edit ? <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input onChange={changeHandler} id="email"
                                       name="email"
                                       value={form.email}
                                       type="email"/>
                                </div> : <h4> <span className="profile-email"> email:</span> {user}</h4>
                                    }
                    </div>
                    {
                        edit ? <div className="profile-editmode-btns">
                            <button onClick={editHandler} className="btn-flat"> Confirm </button>
                            <button onClick={() => {
                                setEdit(false);
                                setForm({email: ""})
                            }} className="btn-flat"> Cancel </button>
                        </div> : <button onClick={() => setEdit(true)} className="btn-flat">Edit </button>
                    }

                </div>
            </div>
            <div className="profile-footer">
                <button data-target="modal1" className="btn-large modal-trigger center-block">Delete Profile</button>
                <div id="modal1" className="modal profile-modal">
                    <div className="modal-content">
                        <h4>Are you sure you want to do this?</h4>
                    </div>
                    <div className="modal-footer" style={{textAlign: 'center'}}>
                        <button onClick={deleteHandler} className="modal-close btn darken-3 ">
                            Yes I DO</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ProfileMain
