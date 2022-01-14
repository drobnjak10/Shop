import React from 'react'
import FlashMessage from 'react-flash-message'

function FlashMsg({ type, msg }) {
    return (
        <FlashMessage duration="3000">
                <div className={`alert alert-${type}`}>{msg}</div>
        </FlashMessage>
    )
}

export default FlashMsg
