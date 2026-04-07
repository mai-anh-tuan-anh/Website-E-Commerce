import { lazy } from 'react';

const HomePage = lazy(() => import('@components/HomePage/HomePage'));
const Blog = lazy(() => import('@pages/Blog/Blog'));
const Shop = lazy(() => import('@pages/OurShop/OurShop'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const ViewCart = lazy(() => import('@pages/ViewCart/ViewCart'));
const Checkout = lazy(() => import('@pages/Checkout/Checkout'));
const OrderConfirmation = lazy(
    () => import('@pages/OrderConfirmation/OrderConfirmation')
);
const DetailProduct = lazy(() => import('@pages/DetailProduct/DetailProduct'));
const Contact = lazy(() => import('@pages/Contact/Contact'));
const Elements = lazy(() => import('@pages/Elements/Elements'));
const routers = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/blog',
        component: Blog
    },
    {
        path: '/shop',
        component: Shop
    },
    {
        path: '/about',
        component: AboutUs
    },
    {
        path: '/contact',
        component: Contact
    },
    {
        path: '/elements',
        component: Elements
    },
    {
        path: '/view-cart',
        component: ViewCart
    },
    {
        path: '/checkout',
        component: Checkout
    },
    {
        path: '/order-confirmation',
        component: OrderConfirmation
    },
    {
        path: '/product/:id',
        component: DetailProduct
    }
];
export default routers;
