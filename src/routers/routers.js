import { lazy } from 'react';

const HomePage = lazy(() => import('@components/HomePage/HomePage'));
const Blog = lazy(() => import('@components/Blog/Blog'));

const routers = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/blog',
        component: Blog
    }
];
export default routers;
