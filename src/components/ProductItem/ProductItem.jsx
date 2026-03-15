import Button from '@components/Button/Button';
import { useState } from 'react';
import styles from './styles.module.scss';
import bagIcon from '@icons/svgs/bagicon.svg';
import eyeIcon from '@icons/svgs/eyeicon.svg';
import rotateIcon from '@icons/svgs/rotateicon.svg';
import wishIcon from '@icons/svgs/wishicon.svg';
function ProductItem({
    src,
    prevSrc,
    name,
    price,
    details,
    isHomepage = true
}) {
    const {
        container,
        boxImg,
        revealWhenHover,
        showFcWhenHover,
        boxIcon,
        title,
        priceBoard,
        priceTitle,
        boxSize,
        size,
        boxBtn,
        active
    } = styles;
    const [sizeChoose, setSizeChoose] = useState('');
    const handleChooseSize = (size) => {
        setSizeChoose((prevSize) => (prevSize === size ? '' : size));
    };
    return (
        <div className={container}>
            <div className={boxImg}>
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={revealWhenHover} />
                <div className={showFcWhenHover}>
                    <div className={boxIcon}>
                        <img src={bagIcon} alt='' />
                        <span className={styles.iconTooltip}>Add to cart</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={wishIcon} alt='' />
                        <span className={styles.iconTooltip}>Favorite</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={rotateIcon} alt='' />
                        <span className={styles.iconTooltip}>Compare</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={eyeIcon} alt='' />
                        <span className={styles.iconTooltip}>Review</span>
                    </div>
                </div>
            </div>
            {!isHomepage && details && details.size && (
                <div className={boxSize}>
                    {details.size.map((item, index) => (
                        <div
                            key={index}
                            className={`${size} ${sizeChoose === item.name ? active : ''}`}
                            onClick={() => handleChooseSize(item.name)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
            <div className={priceBoard}>
                <div className={title}>{name}</div>
                <div className={priceTitle}>{price}$</div>
            </div>
            {!isHomepage && (
                <div className={boxBtn}>
                    <Button content={'ADD TO CART'} />
                </div>
            )}
        </div>
    );
}

export default ProductItem;
