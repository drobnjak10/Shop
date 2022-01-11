import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <section className="container">
            <div className="row mt-5">
                <div className="col-lg-3">
                    <aside>
                        <label className='title'>Order By</label>
                        <ul class="list-group">
                            <li>Default</li>
                            <li>Poplarity</li>
                            <li>Average Rating</li>
                            <li>Price: low to high</li>
                            <li>Price: high to low</li>
                        </ul>
                        <label class="title mt-5">Category</label>
                        <div className="list">
                            <div>
                                <input type="radio" name='category' />
                                <label htmlFor="">All</label>
                            </div>
                            <div>
                                <input type="radio" name='category' />
                                <label htmlFor="">All</label>
                            </div>
                            <div>
                                <input type="radio" name='category' />
                                <label htmlFor="">All</label>
                            </div>
                        </div>
                    </aside>
                </div>
                {/* <div className="card col-3 ml-4" style={{ width: "18rem" }}>
                            <Link to="/product">
                                <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                <div className="card-footer bg-white">
                                    <p>560$</p>
                                </div>
                            </Link>
                        </div> */}
                <div className="col-lg-9 d-flex justify-space-between">
                    <div className="row">
                        <div className="col-4 mb-3">
                            <div className="card" style={{width: "18rem"}}>
                            <Link to="/product">
                                <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                <div className="card-footer bg-white">
                                    <p>560$</p>
                                </div>
                            </Link>
                            </div>
                        </div>                        
                        <div className="col-4 mb-3">
                            <div className="card" style={{width: "18rem"}}>
                            <Link to="/product">
                                <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                <div className="card-footer bg-white">
                                    <p>560$</p>
                                </div>
                            </Link>
                            </div>
                        </div>                        
                        <div className="col-4 mb-3">
                            <div className="card" style={{width: "18rem"}}>
                            <Link to="/product">
                                <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                <div className="card-footer bg-white">
                                    <p>560$</p>
                                </div>
                            </Link>
                            </div>
                        </div>                        
                        <div className="col-4 mb-3">
                            <div className="card" style={{width: "18rem"}}>
                            <Link to="/product">
                                <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                <div className="card-footer bg-white">
                                    <p>560$</p>
                                </div>
                            </Link>
                            </div>
                        </div>                        
                        <div className="col-4 mb-3">
                            <div className="card" style={{width: "18rem"}}>
                            <Link to="/product">
                                <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                <div className="card-footer bg-white">
                                    <p>560$</p>
                                </div>
                            </Link>
                            </div>
                        </div>                        
                        <div className="col-4 mb-3">
                            <div className="card" style={{width: "18rem"}}>
                            <Link to="/product">
                                <img src="ipad.jpg" className="card-img-top" alt="..." style={{ maxWidth: "18rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                <div className="card-footer bg-white">
                                    <p>560$</p>
                                </div>
                            </Link>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
