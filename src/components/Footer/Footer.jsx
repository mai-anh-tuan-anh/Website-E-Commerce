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
        <div className={`${container} pb-10 md:pb-[50px]`}>
            <div>
                <img src={logo} alt='Divine Beauty' className={img} />
            </div>
            <div
                className={`${boxNav} flex flex-wrap justify-center gap-3 md:flex-nowrap md:gap-[30px]`}
            >
                {dataMenu.map((item, index) => (
                    <a key={index} href={item.href}>
                        {item.content}
                    </a>
                ))}
            </div>
            <div className={boxPayment}>
                <p>Guaranteed safe payment</p>
                <div
                    className={`${boxIcons} flex flex-wrap justify-center gap-3 md:flex-nowrap md:gap-5`}
                >
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
            <div className={styles.footerContent}>
                <p>
                    <strong>Address:</strong> Floors 4–5–6, Capital Place
                    Building, No. 29 Lieu Giai Street, Ngoc Ha Ward, Hanoi,
                    Vietnam.
                    <br />
                    <strong>Customer Service:</strong> Call the Skibidi Shop
                    hotline (free of charge) or chat with us directly via the
                    Help Center.
                    <br />
                    <strong>Content Management Responsible Person:</strong> Mai
                    Anh Tuan Anh
                    <br />
                    <strong>Business Registration Number:</strong> 0106773786,
                    first issued by the Hanoi Department of Planning and
                    Investment on February 10, 1996.
                    <br />© 1996-2026, Skibidi Shop, Created by Mai Anh Tuan Anh
                </p>
            </div>
        </div>
    );
}

export default MyFooter;
