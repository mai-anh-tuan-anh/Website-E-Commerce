import { lazy } from 'react';

const HomePage = lazy(() => import('@components/HomePage/HomePage'));
const Blog = lazy(() => import('@components/Blog/Blog'));
const Shop = lazy(() => import('@pages/OurShop/OurShop-test'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs-test'));
const ViewCart = lazy(() => import('@pages/ViewCart/ViewCart'));
const Checkout = lazy(() => import('@pages/Checkout/Checkout'));
const OrderConfirmation = lazy(
    () => import('@pages/OrderConfirmation/OrderConfirmation')
);

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
    }
];
export default routers;
