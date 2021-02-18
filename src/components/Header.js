import React from 'react'
import { Name, TagLine } from '../shared/config'

function Header() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{backgroundColor: "rgba(255,255,255,0)",color: "rgb(255,255,255)",fontWeight: "bold",textAlign: "center"}}>{Name}</h1>
                    </div>
                </div>
            </div>
            <p style={{color: "rgb(255,255,255)",fontSize: "24px",textAlign: "center",}}>{TagLine}</p>
        </>
    )
}

export default Header
