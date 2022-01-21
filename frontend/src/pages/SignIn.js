import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthConsumer } from '../AuthContext';
import FlashMsg from '../component/FlashMessage';
import Loading from '../component/Loading'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error, success, message } = AuthConsumer();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        navigate('/')
    }

    if(loading) {
        return <Loading />
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="col-6">
                    {error &&  <FlashMsg type={'danger'} msg={message} />}
                    { success && <FlashMsg type={'success'} msg={message} />}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-dark">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
