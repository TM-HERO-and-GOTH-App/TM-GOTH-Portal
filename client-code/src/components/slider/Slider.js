import React from "react";
import Slider from "react-slick";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DashboardSlider(props) {
    const {announcementData} = props;
    const slides = [
        {
            title: 'Paris',
            body: 'France',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
        },
        {
            title: 'Singapore',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
        },
        {
            title: 'Prague',
            body: 'Czech Republic',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
        },
        {
            title: 'Amsterdam',
            body: 'Netherlands',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
        },
        {
            title: 'Moscow',
            body: 'Russia',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="slider-container">
            <Box sx={{maxWidth: '100%', flexGrow: 1}}>
                <Slider {...settings}>
                    {
                        slides.map((data, index) => {
                            return (
                                <div className="exterior-slider" key={index}>
                                    <div className="grid-view">
                                        <Box className="layer-1"/>
                                        <Box className="layer-2" href="/">
                                            <div className="slider-des">
                                                <div id="title">
                                                    {data.title}
                                                </div>
                                                <div id="description">
                                                    {data.body}
                                                </div>
                                            </div>
                                            {/*<Button className="slider-info-button" variant="contained" href="#contained-buttons">*/}
                                            {/*    Read More*/}
                                            {/*</Button>*/}
                                        </Box>
                                        <Box className="layer-3"
                                             component="img"
                                             sx={{
                                                 height: 'var(--space-slider-height)',
                                                 display: 'block',
                                                 maxWidth: '1200px',
                                                 overflow: 'hidden',
                                                 width: '100%',
                                                 objectFit: 'cover'
                                             }}
                                             src={data.img}
                                             alt={data.title}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </Box>
        </div>
    );
}

DashboardSlider.propTypes = {
    announcementData: PropTypes.array.isRequired,
}

export default DashboardSlider;
