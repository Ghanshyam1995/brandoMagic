import React from "react";
import Slider from "react-slick";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { brandActions } from '../actions/brandActions';
import { UserActions } from "../actions/userActions";
import { categoryActions } from "../actions/categoryActions";
import * as noti from "../utils/notification";

function SliderArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}


const mapDispatchToProps = dispatch => {
    return {
        getBrands: () => dispatch(brandActions.getBrands()),
        updateBrands: (id) => dispatch(brandActions.selectDeselectBrand(id)),
        toggleLoginPopup: () => dispatch(UserActions.toggleLoginScreen()),
        getCategories: () => dispatch(categoryActions.getCategories()),
        toggleCategorySelection: (id) => dispatch(categoryActions.selectDeselectCategory(id))
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user && state.user.isLoggedIn,
        categories: state.category,
        brands: state.brands
    }
};


class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBrands: false,
            redirect: false
        }
    }

    componentDidMount = () => {
        if (!this.props.categories || this.props.categories.length === 0)
            this.props.getCategories();
        if (!this.props.brands || this.props.brands.length === 0)
            this.props.getBrands();
    }

    selectionProceed = () => {
        if (!this.state.showBrands) {
            if (this.props.categories.findIndex(x => x.isSelected === true) === -1)
                noti.warning("Please select categories");
            else
                this.setState({
                    showBrands: !this.state.showBrands
                })
        }
        else {
            if (this.props.brands.findIndex(x => x.isSelected === true) === -1)
                noti.warning("Please select brands");
            else {
                if (!this.props.isLoggedIn) {
                    this.props.toggleLoginPopup();
                    this.setState({ redirect: true });
                }
                else {
                    // navigate to next page
                    this.props.history.push("/user-dashboard")
                }
            }
        }
    }

    render() {

        const { categories, brands, toggleCategorySelection, updateBrands, isLoggedIn } = this.props;
        if (this.state.redirect && isLoggedIn) {
            this.props.history.push('/user-dashboard');
        }
        const settings = {
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            nextArrow: <SliderArrow />,
            prevArrow: <SliderArrow />,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            ]
        }

        return (
            <div className="section category">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h4 className="title">Select interested categories</h4>
                                <div className="section-nav">
                                    <a className="primary-btn cta-btn" href="#">View All</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="products-tabs">
                                        {
                                            !this.state.showBrands && <div className="products-slick"><Slider classname=""  {...settings}>
                                                {
                                                    categories.map((x, index) => {
                                                        return (
                                                            <div className="product slick-slide" key={x.id}>
                                                                <div className="product-img">
                                                                    <img src={x.imageUrl} alt="product" />
                                                                    <p className="text-center"><strong>{x.name}</strong></p>
                                                                    <div className="icon" onClick={() => toggleCategorySelection(x.id)}>
                                                                        <i className={"fa " + (x.isSelected ? 'fa-check' : 'fa-plus')} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                            </div>
                                        }

                                        {
                                            this.state.showBrands &&
                                            <Slider className="products-slick"  {...settings}>
                                                {
                                                    brands.map((brand, index) => {
                                                        return (
                                                            <div className="product slick-slide" key={brand.id}>
                                                                <div className="product-img">
                                                                    <img src={brand.brandLogo} alt="product" />
                                                                    <p className="text-center"><strong>{brand.brandName}</strong></p>
                                                                    <div className="icon" onClick={() => updateBrands(brand.id)}>
                                                                        <i className={"fa " + (brand.isSelected ? 'fa-check' : 'fa-plus')} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                        }

                                        <div id="slick-nav-2" className="products-slick-nav" />
                                    </div>
                                </div>
                                <div className="col-md-2 text-center">
                                    <div className="btn-container">
                                        <a href onClick={this.selectionProceed} className="btn btn-3">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Category));