import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import ProductItem from '@components/ProductItem/ProductItem';
function SliderCommon({ data, isProductItem = false, showItem = 1 }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: showItem,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <MdKeyboardDoubleArrowLeft />,
        nextArrow: <MdKeyboardDoubleArrowRight />
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
