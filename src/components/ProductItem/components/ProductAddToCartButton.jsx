import Button from '@components/Button/Button';
import styles from '../styles.module.scss';
import bagIcon from '@icons/svgs/bagicon.svg';

function ProductAddToCartButton({ onAddToCart, isLoading }) {
    const { boxBtn } = styles;

    return (
        <div className={`${boxBtn} flex justify-center px-4 sm:px-0`}>
            <Button
                content={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            justifyContent: 'center'
                        }}
                    >
                        <img
                            src={bagIcon}
                            alt=''
                            style={{
                                width: 16,
                                height: 16,
                                filter: 'brightness(3) saturate(100%)'
                            }}
                        />
                        <span>ADD TO CART</span>
                    </div>
                }
                onClick={onAddToCart}
                disabled={isLoading}
            />
        </div>
    );
}

export default ProductAddToCartButton;
