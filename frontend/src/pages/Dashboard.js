import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthConsumer } from '../AuthContext';
import {MdDashboardCustomize} from 'react-icons/md'
import { AiFillDashboard } from 'react-icons/ai';
import Sidebar from '../component/User/Sidebar';

function Dashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error, authed } = AuthConsumer();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

  


    return (
        <div className="container bg-dark mt-5">
            <div className="row">
                <div className="col-md-2">
                   <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container">
                       overview
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
