import { dataMenu } from './constants';
import styles from './styles.module.scss';
import logo from '@icons/images/logo.png';
import visa from '@icons/svgs/visaicon.svg';
import amazon from '@icons/svgs/amazonicon.svg';
import discover from '@icons/svgs/discovericon.svg';
import mastercard from '@icons/svgs/mastercardicon.svg';
import paypal from '@icons/svgs/paypalicon.svg';
function MyFooter() {
    const { container, img, boxNav, boxPayment, boxIcons, paymentIcon } =
        styles;
    return (
        <div className={container}>
            <div>
                <img src={logo} alt='Divine Beauty' className={img} />
            </div>
            <div className={boxNav}>
                {dataMenu.map((item, index) => (
                    <a key={index} href={item.href}>
                        {item.content}
                    </a>
                ))}
            </div>
            <div className={boxPayment}>
                <p>Guaranteed safe payment</p>
                <div className={boxIcons}>
                    <img src={visa} alt='Visa' className={paymentIcon} />
                    <img src={amazon} alt='Amazon' className={paymentIcon} />
                    <img
                        src={discover}
                        alt='Discover'
                        className={paymentIcon}
                    />
                    <img
                        src={mastercard}
                        alt='Mastercard'
                        className={paymentIcon}
                    />
                    <img src={paypal} alt='PayPal' className={paymentIcon} />
                </div>
            </div>
            <div styles={{ textAlign: 'center', marginTop: '50px' }}>
                Copyright © 1996-2026, Skibidi Shop, Created by Mai Anh Tuan Anh
            </div>
        </div>
    );
}

export default MyFooter;
