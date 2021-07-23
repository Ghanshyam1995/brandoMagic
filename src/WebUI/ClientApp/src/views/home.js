import React, { Component } from 'react';
import { connect } from 'react-redux';
import BannerSlider from "../components/banner";
import Category from "../components/category";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <BannerSlider />
                <Category />

                <div className="section bottom-menu">
                    <div className="container">
                        <div className="bottom-menu-wrapper">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="menu-box">
                                        <img src="./img/bottom/i.png" className="img-responsive" alt="" />
                                        <p className="text-center"><strong>Home</strong></p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="menu-box">
                                        <img src="./img/bottom/ii.png" className="img-responsive" alt="" />
                                        <p className="text-center"><strong>Help</strong></p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="menu-box">
                                        <img src="./img/bottom/iii.png" className="img-responsive" alt="" />
                                        <p className="text-center"><strong>Contests</strong></p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="menu-box">
                                        <img src="./img/bottom/iv.png" className="img-responsive" alt="" />
                                        <p className="text-center"><strong>Offers</strong></p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="menu-box">
                                        <img src="./img/bottom/v.png" className="img-responsive" alt="" />
                                        <p className="text-center"><strong>Discussion</strong></p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="menu-box">
                                        <img src="./img/bottom/vi.png" className="img-responsive" alt="" />
                                        <p className="text-center"><strong>Media</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
// later change to connect store
export default connect()(Home);