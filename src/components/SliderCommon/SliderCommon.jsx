import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import ProductItem from '@components/ProductItem/ProductItem';
function SliderCommon({ data, isProductItem = false, showItem = 4 }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: showItem,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <MdKeyboardDoubleArrowLeft />,
        nextArrow: <MdKeyboardDoubleArrowRight />,
        responsive: [
            {
                breakpoint: 640, // sm breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768, // md breakpoint
                settings: {
                    slidesToShow: Math.min(2, showItem),
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024, // lg breakpoint
                settings: {
                    slidesToShow: Math.min(3, showItem),
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index}>
                        {isProductItem ? (
                            <ProductItem
                                src={item.image}
                                prevSrc={item.image}
                                name={item.name}
                                price={item.price}
                                details={item}
                                isHomepage={false}
                            />
                        ) : (
                            <img src={item} alt='picture' />
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SliderCommon;
