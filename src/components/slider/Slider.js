import {react} from 'react';
import Slider from "react-slick";
import Box from '@mui/material/Box';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DashboardSlider() {
    const slides = [
        {
            city: 'Paris',
            country: 'France',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
        },
        {
            city: 'Singapore',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
        },
        {
            city: 'Prague',
            country: 'Czech Republic',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
        },
        {
            city: 'Amsterdam',
            country: 'Netherlands',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
        },
        {
            city: 'Moscow',
            country: 'Russia',
            img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
        },
    ];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box sx={{maxWidth: 2200, flexGrow: 1}}>
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        slides.map((data, index) => {
                            return (
                                <div className="exterior-slider" key={index}>
                                    {/*<div className="" style={{backgroundImage: `url(${data.img})`}}/>*/}
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 600,
                                            display: 'block',
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={data.img}
                                        alt={data.city}
                                    />
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </Box>
    )
        ;
}

export default DashboardSlider;
