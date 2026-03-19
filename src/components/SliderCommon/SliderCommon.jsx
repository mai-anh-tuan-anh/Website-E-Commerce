import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
function SliderCommon({ data }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };
    return (
        <div>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index}>
                        <img src={item} alt='picture' />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SliderCommon;
