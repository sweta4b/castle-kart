import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'

function LandingPage() {

    const navigate = useNavigate()
    const { setSelectedCategory, categories } = useContext(AppContext)

    // const goToCategory = (category) => {
    //     setSelectedCategory(category)
    //     navigate("/product")
    // }

    return (
        <div>
            <div className="conatiner">
                <div className="img-container">
                    <div className="background-img"></div>
                    <div className="page-text">
                        <div className="text">
                            <div className='waviy'>
                                <h1 className='title-text'>Upgrade your wardrobe</h1>
                                <h1 className='title-text'>with new collections</h1>
                            </div>
                            <button className='btn'
                                onClick={() => navigate("/product")}>
                                Shop Now
                            </button>

                        </div>
                    </div>
                </div>
                <div className="category-container flex-center">
                    <div className="contain">
                        <div className="category-heading">
                            <h1 style={{
                                textAlign: 'center',
                                color: 'brown'
                            }}>Featured Categories
                            </h1>
                        </div>
                        <div className="category-row">
                            {categories.map((category) =>
                            (
                                <Link to= {`/product/${category.category}`} key={category._id}>
                                <div key={category._id} className="box-row box-img2" >
                                    <div className="detail-box text-center">
                                        <img src={category.img} alt="" />
                                        <h2 className='content'>{category.category.toUpperCase()}</h2>
                                        <div className="paraLink  hover-content content">
                                            <p id="shop" className='lineUp'><b>Shop Now</b></p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <footer className='footer-m'>
                <section className="footer">
                    <h2>Castle Kart</h2>
                    <p className="paragraph"></p>
                    <p>Privacy Policy</p>
                    <p>Term and Use</p>
                    <p className="paragraph-last">Sweta @ 2023</p>
                </section>
            </footer>
        </div>
    )
}

export default LandingPage
