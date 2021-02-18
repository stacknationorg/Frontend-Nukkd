import React from 'react'
import { Link } from 'react-router-dom';
import { Routes } from './Routes';
import axios from "axios"
import { APILink } from './config';
import parse from "html-react-parser"

function UserDropdown() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [messages,setMessages] = React.useState('');
    const logout = () => {
        localStorage.removeItem("customer-token")
    }
    const loadMessages = (e) => {
        e.preventDefault()
        setMessages('')
        axios.post(`${APILink}/user/new-message`,{uid:user.id})
            .then(res => {
                if(res.data.response.code==="SUCCESS"){
                    setMessages(res.data.response.messages)
                }
                else{
                    setMessages(null)
                }
            });
    }
    return (
        <>
        <li className="nav-item dropdown">
            <a id="navbarDropdown" href="#!" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre="true">
                <img src={user.photo} alt="User dp" height="25px" width="25px" className="rounded-circle mr-2" />{user.name}<span className="caret"></span>
            </a>

            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to={Routes.userDashboard.path}>
                    {Routes.userDashboard.name}
                </Link>
                <Link className="dropdown-item" to={Routes.userSettings.path}>
                    {Routes.userSettings.name}
                </Link>
                <Link className="dropdown-item" to={Routes.userPurchases.path}>
                    {Routes.userPurchases.name}
                </Link>
                <hr/>
                <Link className="dropdown-item" to={Routes.userItems.path}>
                    {Routes.userItems.name}
                </Link>
                <Link className="dropdown-item" to={Routes.userProductUpload.path}>
                    {Routes.userProductUpload.name}
                </Link>
                <Link className="dropdown-item" to={Routes.userWithdraw.path}>
                    {Routes.userWithdraw.name}
                </Link>

                <hr/>
                <span style={{cursor:"pointer"}} className="dropdown-item" onClick={()=>logout()}>
                    Logout
                </span>
            </div>
        </li>
    <li className="nav-item dropdown">
        <a id="msgDropdown" onClick={(e)=>loadMessages(e)} data-toggle="dropdown" className="nav-link dropdown-toggle" href="#msgs" aria-haspopup="true" aria-expanded="false" v-pre="true" role="button"><span className="fa fa-envelope"></span></a>
        <div className="dropdown-menu dropdown-menu-right p-2" aria-labelledby="msgDropdown">
            <div id="msgl">
                {messages===null?"No new message found":messages===''?
                <center><div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div></center>:
                messages.map((msg,key) => {
                    return(
                        <div key={key}>
                            <Link to={`/user/${msg.sender.id}/${msg.sender.username}/messages`} className="text-decoration-none">
                                <span style={{color:"black"}}>{msg.sender.username}:</span><br/>{parse(msg.message)}
                            </Link>
                            <hr/>
                        </div>
                    )
                })}
            </div>
            <center><Link style={{textDecoration:"none"}} to={Routes.userMessages.path}>See all</Link></center>
        </div>
    </li>
    {/* <li className="nav-item dropdown">
        <a id="notifDropdown" data-toggle="dropdown" className="nav-link dropdown-toggle" href="#notifications" aria-haspopup="true" aria-expanded="false" v-pre="true" role="button"><span className="fa fa-bell"></span></a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="notifDropdown">
            <div id="notifl"></div>
            <center><a href="/notifications">See all</a></center>
        </div>
    </li> */}
    </>
    )
}

export default UserDropdown
