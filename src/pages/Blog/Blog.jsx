import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaSearch,
    FaCalendar,
    FaUser,
    FaArrowRight,
    FaTags,
    FaChevronRight,
    FaHeart,
    FaRegHeart,
    FaShareAlt,
    FaBookmark,
    FaRegBookmark
} from 'react-icons/fa';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import styles from './styles.module.scss';

const Blog = () => {
    const navigate = useNavigate();
    const { functionBox, btnBack } = styles;
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

    const categories = [
        { name: 'All', count: 12 },
        { name: 'Fashion', count: 5 },
        { name: 'Beauty', count: 3 },
        { name: 'Lifestyle', count: 2 },
        { name: 'Tips', count: 2 }
    ];

    const featuredPost = {
        id: 1,
        title: '2024 Fashion Trends: What to Wear This Season',
        excerpt:
            'Discover the hottest fashion trends that will dominate 2024. From sustainable fabrics to bold colors, we explore everything you need to know to stay stylish.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop',
        category: 'Fashion',
        author: 'Emma Style',
        date: 'Dec 15, 2024',
        readTime: '5 min read',
        likes: 234
    };

    const blogPosts = [
        {
            id: 2,
            title: '10 Essential Skincare Tips for Winter',
            excerpt:
                'Keep your skin glowing and healthy during the cold winter months with these expert skincare tips.',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop',
            category: 'Beauty',
            author: 'Sarah Beauty',
            date: 'Dec 12, 2024',
            readTime: '4 min read',
            likes: 156
        },
        {
            id: 3,
            title: 'How to Build a Capsule Wardrobe',
            excerpt:
                'Learn how to create a versatile wardrobe with fewer pieces that work together perfectly.',
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop',
            category: 'Fashion',
            author: 'Lisa Minimal',
            date: 'Dec 10, 2024',
            readTime: '6 min read',
            likes: 189
        },
        {
            id: 4,
            title: 'Sustainable Fashion: A Complete Guide',
            excerpt:
                'Everything you need to know about building an eco-friendly wardrobe without compromising on style.',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop',
            category: 'Lifestyle',
            author: 'Green Living',
            date: 'Dec 8, 2024',
            readTime: '8 min read',
            likes: 267
        },
        {
            id: 5,
            title: 'Makeup Tips for Every Skin Type',
            excerpt:
                'Find the perfect makeup routine tailored to your specific skin type and concerns.',
            image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop',
            category: 'Beauty',
            author: 'Mia Makeup',
            date: 'Dec 5, 2024',
            readTime: '5 min read',
            likes: 143
        },
        {
            id: 6,
            title: 'Accessorizing 101: The Complete Guide',
            excerpt:
                'Master the art of accessorizing with our comprehensive guide to jewelry, bags, and more.',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
            category: 'Fashion',
            author: 'Alex Accessory',
            date: 'Dec 3, 2024',
            readTime: '4 min read',
            likes: 198
        },
        {
            id: 7,
            title: 'Morning Routine for Busy Professionals',
            excerpt:
                'Quick and effective morning routine tips for those who want to look their best with limited time.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
            category: 'Lifestyle',
            author: 'Tim Efficient',
            date: 'Dec 1, 2024',
            readTime: '3 min read',
            likes: 312
        }
    ];

    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory =
            activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleLike = (postId, e) => {
        e.stopPropagation();
        setLikedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleBookmark = (postId, e) => {
        e.stopPropagation();
        setBookmarkedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={`${styles.blogContainer} min-h-screen bg-gray-50`}>
            <MyHeader />

            {/* Hero Section */}
            <section className='relative bg-linear-to-br from-primary/10 to-secondary/10 pt-30 pb-16 md:pt-35 md:pb-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div
                        className={`${functionBox} mt-[90px] gap-[10px] px-4 md:mt-[83px] md:gap-3 md:px-5`}
                    >
                        <div>
                            <button
                                type='button'
                                onClick={() => navigate('/')}
                                className={btnBack}
                            >
                                <FaHome /> Home
                            </button>
                        </div>
                        <button
                            type='button'
                            onClick={handleBack}
                            className={btnBack}
                        >
                            ← Back
                        </button>
                    </div>

                    {/* Hero Content */}
                    <div className='text-center'>
                        <h1 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl'>
                            Our <span className='text-primary'>Blog</span>
                        </h1>
                        <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                            Discover the latest trends, tips, and stories from
                            the world of fashion and beauty
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post Section */}
            <section className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
                <div
                    className='group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl'
                    onClick={() => handleReadMore(featuredPost.id)}
                >
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        <div className='relative h-64 overflow-hidden lg:h-auto'>
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                            />
                            <div className='absolute left-4 top-4'>
                                <span className='rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white'>
                                    {featuredPost.category}
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center p-6 lg:p-10'>
                            <div className='mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500'>
                                <span className='flex items-center gap-1'>
                                    <FaCalendar /> {featuredPost.date}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaUser /> {featuredPost.author}
                                </span>
                                <span>{featuredPost.readTime}</span>
                            </div>
                            <h2 className='mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary md:text-3xl'>
                                {featuredPost.title}
                            </h2>
                            <p className='mb-6 text-gray-600'>
                                {featuredPost.excerpt}
                            </p>
                            <div className='flex items-center justify-between'>
                                <button className='cursor-pointer flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3'>
                                    Read More <FaArrowRight />
                                </button>
                                <div className='flex items-center gap-3'>
                                    <button
                                        onClick={(e) =>
                                            handleLike(featuredPost.id, e)
                                        }
                                        className={`flex items-center gap-1 transition-colors ${
                                            likedPosts.has(featuredPost.id)
                                                ? 'text-red-500'
                                                : 'text-gray-400 hover:text-red-500'
                                        }`}
                                    >
                                        {likedPosts.has(featuredPost.id) ? (
                                            <FaHeart />
                                        ) : (
                                            <FaRegHeart />
                                        )}
                                        <span className='text-sm'>
                                            {featuredPost.likes +
                                                (likedPosts.has(featuredPost.id)
                                                    ? 1
                                                    : 0)}
                                        </span>
                                    </button>
                                    <button
                                        onClick={(e) =>
                                            handleBookmark(featuredPost.id, e)
                                        }
                                        className={`transition-colors ${
                                            bookmarkedPosts.has(featuredPost.id)
                                                ? 'text-primary'
                                                : 'text-gray-400 hover:text-primary'
                                        }`}
                                    >
                                        {bookmarkedPosts.has(
                                            featuredPost.id
                                        ) ? (
                                            <FaBookmark />
                                        ) : (
                                            <FaRegBookmark />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className='mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
                    {/* Sidebar */}
                    <aside className='order-2 space-y-6 lg:order-1'>
                        {/* Search */}
                        <div className='rounded-xl bg-white p-6 shadow-md'>
                            <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                                Search
                            </h3>
                            <div className='relative'>
                                <input
                                    type='text'
                                    placeholder='Search articles...'
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className='w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20'
                                />
                                <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className='rounded-xl bg-white p-6 shadow-md'>
                            <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                                Categories
                            </h3>
                            <div className='space-y-2'>
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() =>
                                            setActiveCategory(category.name)
                                        }
                                        className={` cursor-pointer flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-sm transition-all ${
                                            activeCategory === category.name
                                                ? 'bg-gray-100 text-black'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        <span className='flex items-center gap-2'>
                                            <FaTags className='text-xs' />
                                            {category.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className='rounded-xl bg-white p-6 shadow-md'>
                            <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                                Popular Tags
                            </h3>
                            <div className='flex flex-wrap gap-2'>
                                {[
                                    'Skincare',
                                    'Outfits',
                                    'Trends',
                                    'Tips',
                                    'DIY',
                                    'Style',
                                    'Makeup',
                                    'Hair'
                                ].map((tag) => (
                                    <button
                                        key={tag}
                                        className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-all hover:bg-primary hover:scale-110 cursor-pointer'
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Blog Grid */}
                    <div className='order-1 lg:order-2 lg:col-span-3'>
                        <div className='mb-6 flex items-center justify-between'>
                            <h2 className='text-2xl font-bold text-gray-900'>
                                {activeCategory === 'All'
                                    ? 'Latest Articles'
                                    : `${activeCategory} Articles`}
                            </h2>
                            <span className='text-sm text-gray-500'>
                                {filteredPosts.length}{' '}
                                {filteredPosts.length === 1
                                    ? 'article'
                                    : 'articles'}
                            </span>
                        </div>

                        {filteredPosts.length === 0 ? (
                            <div className='rounded-xl bg-white p-12 text-center shadow-md'>
                                <p className='text-gray-500'>
                                    No articles found matching your criteria.
                                </p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
                                {filteredPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        className='group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl'
                                        onClick={() => handleReadMore(post.id)}
                                    >
                                        <div className='relative h-48 overflow-hidden'>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='cursor-pointer h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                                            />
                                            <div className='absolute left-3 top-3'>
                                                <span className='rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm'>
                                                    {post.category}
                                                </span>
                                            </div>
                                            <div className='absolute right-3 top-3 flex gap-2'>
                                                <button
                                                    onClick={(e) =>
                                                        handleLike(post.id, e)
                                                    }
                                                    className={`rounded-full bg-white/90 p-2 backdrop-blur-sm transition-all ${
                                                        likedPosts.has(post.id)
                                                            ? 'text-red-500'
                                                            : 'text-gray-400 hover:text-red-500'
                                                    }`}
                                                >
                                                    {likedPosts.has(post.id) ? (
                                                        <FaHeart size={14} />
                                                    ) : (
                                                        <FaRegHeart size={14} />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={(e) =>
                                                        handleBookmark(
                                                            post.id,
                                                            e
                                                        )
                                                    }
                                                    className={`rounded-full bg-white/90 p-2 backdrop-blur-sm transition-all ${
                                                        bookmarkedPosts.has(
                                                            post.id
                                                        )
                                                            ? 'text-primary'
                                                            : 'text-gray-400 hover:text-primary'
                                                    }`}
                                                >
                                                    {bookmarkedPosts.has(
                                                        post.id
                                                    ) ? (
                                                        <FaBookmark size={14} />
                                                    ) : (
                                                        <FaRegBookmark
                                                            size={14}
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex flex-1 flex-col p-5'>
                                            <div className='mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500'>
                                                <span className='flex items-center gap-1'>
                                                    <FaCalendar /> {post.date}
                                                </span>
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h3 className='mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary'>
                                                {post.title}
                                            </h3>
                                            <p className='mb-4 flex-1 text-sm text-gray-600 line-clamp-2'>
                                                {post.excerpt}
                                            </p>
                                            <div className='flex items-center justify-between border-t border-gray-100 pt-4'>
                                                <div className='flex items-center gap-2'>
                                                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary'>
                                                        {post.author
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </div>
                                                    <span className='text-xs font-medium text-gray-700'>
                                                        {post.author}
                                                    </span>
                                                </div>
                                                <button className='cursor-pointer flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2'>
                                                    Read{' '}
                                                    <FaArrowRight size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {/* Load More Button */}
                        {filteredPosts.length > 0 && (
                            <div className='mt-10 text-center'>
                                <button className='rounded-full bg-primary px-8 py-3 font-semibold text-black shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95 cursor-pointer'>
                                    Load More Articles
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className='bg-linear-to-r from-primary to-secondary pt-16'>
                <div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
                    <h2 className='mb-4 text-3xl font-bold text-white md:text-4xl'>
                        Stay Updated with Our Newsletter
                    </h2>
                    <p className=' text-white/80'>
                        Get the latest fashion tips, beauty secrets, and
                        exclusive offers delivered to your inbox
                    </p>
                </div>
            </section>

            <MyFooter />
        </div>
    );
};

export default Blog;
