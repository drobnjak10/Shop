import React from 'react'

const Loading = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="col-6 offset-3 ">
                    <div className="spinner-border m-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading