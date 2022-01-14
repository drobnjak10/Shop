import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthConsumer } from '../AuthContext';
import FlashMsg from '../component/FlashMessage';
import Loading from '../component/Loading'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error, success, message } = AuthConsumer();


    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        Navigate('/signin')
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
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" class="btn btn-dark">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
