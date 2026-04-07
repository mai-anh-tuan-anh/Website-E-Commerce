import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaPalette,
    FaMobileAlt,
    FaCode,
    FaRocket
} from 'react-icons/fa';

const Elements = () => {
    const navigate = useNavigate();

    const elements = [
        {
            icon: <FaPalette className='text-3xl mb-3' />,
            title: 'Design System',
            description: 'Color palette, typography, and visual guidelines',
            features: ['Primary Colors', 'Typography Scale', 'Spacing System']
        },
        {
            icon: <FaMobileAlt className='text-3xl mb-3' />,
            title: 'Responsive Components',
            description: 'Mobile-first design principles',
            features: ['Breakpoints', 'Grid System', 'Flexbox Layout']
        },
        {
            icon: <FaCode className='text-3xl mb-3' />,
            title: 'UI Components',
            description: 'Reusable interface elements',
            features: ['Buttons', 'Forms', 'Cards', 'Modals']
        },
        {
            icon: <FaRocket className='text-3xl mb-3' />,
            title: 'Performance',
            description: 'Optimized for speed and efficiency',
            features: ['Lazy Loading', 'Code Splitting', 'Optimized Assets']
        }
    ];

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                        Elements & Design System
                    </h1>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-8'>
                        Explore the building blocks that make our website
                        beautiful and functional
                    </p>

                    {/* Home Button */}
                    <button
                        onClick={() => navigate('/')}
                        className='inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer'
                    >
                        <FaHome />
                        <span>Back to Homepage</span>
                    </button>
                </div>

                {/* Elements Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                    {elements.map((element, index) => (
                        <div
                            key={index}
                            className='bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100'
                        >
                            <div className='text-blue-600 text-center'>
                                {element.icon}
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2 text-center'>
                                {element.title}
                            </h3>
                            <p className='text-gray-600 text-sm mb-4 text-center'>
                                {element.description}
                            </p>
                            <ul className='space-y-1'>
                                {element.features.map(
                                    (feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className='text-xs text-gray-500 flex items-center gap-1'
                                        >
                                            <span className='w-1.5 h-1.5 bg-blue-400 rounded-full'></span>
                                            {feature}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Color Palette Section */}
                <div className='bg-white rounded-xl p-8 shadow-md mb-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                        Color Palette
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'>
                        {[
                            { name: 'Primary', color: 'bg-blue-600' },
                            { name: 'Secondary', color: 'bg-gray-600' },
                            { name: 'Success', color: 'bg-green-500' },
                            { name: 'Warning', color: 'bg-yellow-500' },
                            { name: 'Danger', color: 'bg-red-500' },
                            { name: 'Info', color: 'bg-cyan-500' },
                            { name: 'Light', color: 'bg-gray-100' },
                            { name: 'Dark', color: 'bg-gray-900' }
                        ].map((color, index) => (
                            <div key={index} className='text-center'>
                                <div
                                    className={`h-16 w-full ${color.color} rounded-lg mb-2 shadow-sm`}
                                ></div>
                                <p className='text-xs text-gray-600'>
                                    {color.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Typography Section */}
                <div className='bg-white rounded-xl p-8 shadow-md'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                        Typography Scale
                    </h2>
                    <div className='space-y-4'>
                        <div className='text-4xl font-bold text-gray-900'>
                            Heading 1
                        </div>
                        <div className='text-3xl font-bold text-gray-900'>
                            Heading 2
                        </div>
                        <div className='text-2xl font-semibold text-gray-900'>
                            Heading 3
                        </div>
                        <div className='text-xl font-semibold text-gray-900'>
                            Heading 4
                        </div>
                        <div className='text-lg text-gray-700'>
                            Large Body Text
                        </div>
                        <div className='text-base text-gray-600'>
                            Regular Body Text
                        </div>
                        <div className='text-sm text-gray-500'>Small Text</div>
                        <div className='text-xs text-gray-400'>
                            Caption Text
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Elements;
