import React from 'react'
import "../assets/css/errpage.css"
import Title from '../shared/Title'

function Err404() {
    return (
        <div className="flex-center position-ref full-height">
            <Title title="404 Not Found"/>
            <div className="code">
                404            </div>

            <div className="message" style={{padding: "10px"}}>
                Not Found            </div>
        </div>
    )
}

export default Err404
