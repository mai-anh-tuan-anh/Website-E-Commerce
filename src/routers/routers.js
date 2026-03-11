import { lazy } from 'react';

const HomePage = lazy(() => import('@components/HomePage/HomePage'));
const Blog = lazy(() => import('@components/Blog/Blog'));
const Shop = lazy(() => import('@pages/OurShop/OurShop'));
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
    }
];
export default routers;
