import React from "react";
import Slider from "react-slick";

function Arrow(props) {
    let className = props.type == "next" ? "slick-next slick-arrow" : "slick-prev slick-arrow";
    className += " arrow";
    return (
        <div className="products-slick-nav">
            <button type="button" className={className} onClick={props.onClick}>
            </button>
        </div>
    );
}

const BannerSlider = () => (
    <div className="section banners">
        <div className="container-fluid">
            <Slider className="banner-slick"
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                infinite={true}
                speed={1000}
                dots={false}
                arrows={false}
                nextArrow={<Arrow type="next" />}
                prevArrow={<Arrow type="prev" />}
            >
                <div className="banners-box">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hot-deal">
                                <ul className="hot-deal-countdown">
                                    <li>
                                        <div>
                                            <h3>02</h3>
                                            <span>Days</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>10</h3>
                                            <span>Hours</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>34</h3>
                                            <span>Mins</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>60</h3>
                                            <span>Secs</span>
                                        </div>
                                    </li>
                                </ul>
                                <h2 className="text-uppercase">hot deal this week</h2>
                                <p>New Collection Up to 50% OFF</p>
                                <a className="primary-btn cta-btn" href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banners-box">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hot-deal">
                                <ul className="hot-deal-countdown">
                                    <li>
                                        <div>
                                            <h3>02</h3>
                                            <span>Days</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>10</h3>
                                            <span>Hours</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>34</h3>
                                            <span>Mins</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>60</h3>
                                            <span>Secs</span>
                                        </div>
                                    </li>
                                </ul>
                                <h2 className="text-uppercase">hot deal this week</h2>
                                <p>New Collection Up to 50% OFF</p>
                                <a className="primary-btn cta-btn" href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banners-box">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hot-deal">
                                <ul className="hot-deal-countdown">
                                    <li>
                                        <div>
                                            <h3>02</h3>
                                            <span>Days</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>10</h3>
                                            <span>Hours</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>34</h3>
                                            <span>Mins</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <h3>60</h3>
                                            <span>Secs</span>
                                        </div>
                                    </li>
                                </ul>
                                <h2 className="text-uppercase">hot deal this week</h2>
                                <p>New Collection Up to 50% OFF</p>
                                <a className="primary-btn cta-btn" href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
            <div id="slick-nav-3" className="products-slick-nav" />
        </div>
    </div>
)

export default BannerSlider;