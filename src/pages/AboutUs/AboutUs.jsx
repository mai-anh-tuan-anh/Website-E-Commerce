import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import styles from './styles.module.scss';
import about from '../../assets/images/about.jpg';
import {
    FaHome,
    FaHeart,
    FaRocket,
    FaUsers,
    FaAward,
    FaTruck,
    FaShieldAlt,
    FaLeaf,
    FaLightbulb,
    FaHandshake,
    FaStar,
    FaQuoteLeft,
    FaArrowRight,
    FaPlay,
    FaCheckCircle,
    FaGlobe,
    FaBoxOpen
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
    const navigate = useNavigate();
    const {
        container,
        functionBox,
        btnBack,
        hero,
        heroContent,
        heroTitle,
        heroDescription,
        heroStats,
        statItem,
        statNumber,
        statLabel,
        section,
        containerSection,
        sectionTitle,
        sectionSubtitle,
        storySection,
        storyContent,
        storyTitle,
        storyText,
        storyImage,
        missionVisionSection,
        missionVisionGrid,
        missionCard,
        missionIcon,
        missionTitle,
        missionDescription,
        valuesGrid,
        valueCard,
        valueIcon,
        valueTitle,
        valueDescription,
        differentSection,
        differentContent,
        differentList,
        differentItem,
        differentIcon,
        teamSection,
        teamGrid,
        teamMember,
        teamImage,
        teamInfo,
        teamName,
        teamRole,
        teamSocial,
        trustSection,
        trustGrid,
        trustCard,
        trustIcon,
        trustNumber,
        trustLabel,
        testimonialSection,
        testimonialGrid,
        testimonialCard,
        testimonialText,
        testimonialAuthor,
        testimonialRole,
        testimonialStars,
        ctaSection,
        ctaContent,
        ctaTitle,
        ctaText,
        ctaButtons,
        ctaBtn,
        timelineSection,
        timeline,
        timelineItem,
        timelineDate,
        timelineContent,
        timelineDot
    } = styles;

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className={container}>
                <MyHeader />

                {/* Hero Section */}
                <div className={hero}>
                    <div className={heroContent}>
                        <h1 className={heroTitle}>Welcome to Divine Beauty</h1>
                        <p className={heroDescription}>
                            Where quality meets passion. We're not just selling
                            products – we're crafting experiences that inspire
                            confidence and celebrate your unique style.
                        </p>
                        <div className={heroStats}>
                            <div className={statItem}>
                                <div className={statNumber}>50K+</div>
                                <div className={statLabel}>Happy Customers</div>
                            </div>
                            <div className={statItem}>
                                <div className={statNumber}>1000+</div>
                                <div className={statLabel}>
                                    Premium Products
                                </div>
                            </div>
                            <div className={statItem}>
                                <div className={statNumber}>99%</div>
                                <div className={statLabel}>
                                    Satisfaction Rate
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={functionBox}>
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className={btnBack}
                        >
                            <FaHome /> Home
                        </button>
                    </div>
                    <button onClick={() => handleBack()} className={btnBack}>
                        ← Back
                    </button>
                </div>
                {/* Our Story Section */}
                <div className={storySection}>
                    <div className={containerSection}>
                        <div className={storyContent}>
                            <div className={storyText}>
                                <h2 className={storyTitle}>Our Story</h2>
                                <p>
                                    It all started in 2024 with a simple
                                    realization: shopping for lifestyle products
                                    should be joyful, not stressful. Our
                                    founder, tired of compromising between
                                    quality and convenience, set out to create
                                    something different.
                                </p>
                                <p>
                                    What began as a small operation in a home
                                    office has grown into a trusted destination
                                    for quality-conscious shoppers. We've
                                    carefully curated every product in our
                                    collection, ensuring it meets our high
                                    standards for quality, style, and
                                    sustainability.
                                </p>
                                <p>
                                    Today, we're proud to serve thousands of
                                    customers who share our values. Every order
                                    we ship represents a relationship built on
                                    trust, quality, and the belief that everyone
                                    deserves to experience the best.
                                </p>
                            </div>
                            <div className={storyImage}>
                                <img src={about} alt='Our Story' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision Section */}
                <div className={missionVisionSection}>
                    <div className={containerSection}>
                        <h2 className={sectionTitle}>Our Purpose</h2>
                        <p className={sectionSubtitle}>
                            Driving change through quality and innovation
                        </p>
                        <div className={missionVisionGrid}>
                            <div className={missionCard}>
                                <FaRocket className={missionIcon} />
                                <h3 className={missionTitle}>Our Mission</h3>
                                <p className={missionDescription}>
                                    To provide exceptional lifestyle products
                                    that enhance daily living while maintaining
                                    the highest standards of quality,
                                    sustainability, and customer satisfaction.
                                </p>
                            </div>
                            <div className={missionCard}>
                                <FaLightbulb className={missionIcon} />
                                <h3 className={missionTitle}>Our Vision</h3>
                                <p className={missionDescription}>
                                    To become the most trusted online
                                    destination for lifestyle products, known
                                    for our curated selection, exceptional
                                    service, and commitment to making quality
                                    accessible to everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Values Section */}
                <div className={section}>
                    <div className={containerSection}>
                        <h2 className={sectionTitle}>Our Core Values</h2>
                        <p className={sectionSubtitle}>
                            The principles that guide everything we do
                        </p>
                        <div className={valuesGrid}>
                            <div className={valueCard}>
                                <FaHeart className={valueIcon} />
                                <h3 className={valueTitle}>Customer First</h3>
                                <p className={valueDescription}>
                                    Your satisfaction is our north star. Every
                                    decision we make starts with "How does this
                                    benefit our customers?"
                                </p>
                            </div>
                            <div className={valueCard}>
                                <FaStar className={valueIcon} />
                                <h3 className={valueTitle}>
                                    Quality Excellence
                                </h3>
                                <p className={valueDescription}>
                                    We never compromise on quality. Every
                                    product is carefully selected and tested to
                                    ensure it meets our high standards.
                                </p>
                            </div>
                            <div className={valueCard}>
                                <FaLeaf className={valueIcon} />
                                <h3 className={valueTitle}>Sustainability</h3>
                                <p className={valueDescription}>
                                    We're committed to protecting our planet.
                                    From eco-friendly packaging to sustainable
                                    product choices, we make decisions that
                                    matter.
                                </p>
                            </div>
                            <div className={valueCard}>
                                <FaHandshake className={valueIcon} />
                                <h3 className={valueTitle}>Integrity</h3>
                                <p className={valueDescription}>
                                    We believe in transparency and honesty. No
                                    hidden fees, no misleading claims – just
                                    straightforward business you can trust.
                                </p>
                            </div>
                            <div className={valueCard}>
                                <FaLightbulb className={valueIcon} />
                                <h3 className={valueTitle}>Innovation</h3>
                                <p className={valueDescription}>
                                    We're always looking for better ways to
                                    serve you. From new technologies to improved
                                    processes, innovation drives us forward.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What Makes Us Different Section */}
                <div className={differentSection}>
                    <div className={containerSection}>
                        <div className={differentContent}>
                            <h2 className={sectionTitle}>
                                What Makes Us Different
                            </h2>
                            <p className={sectionSubtitle}>
                                We're not just another e-commerce store. Here's
                                what sets us apart:
                            </p>
                            <div className={differentList}>
                                <div className={differentItem}>
                                    <FaShieldAlt className={differentIcon} />
                                    <div>
                                        <h4>Quality Guarantee</h4>
                                        <p>
                                            Every product comes with our 30-day
                                            quality guarantee. If you're not
                                            satisfied, we'll make it right.
                                        </p>
                                    </div>
                                </div>
                                <div className={differentItem}>
                                    <FaTruck className={differentIcon} />
                                    <div>
                                        <h4>Fast, Free Shipping</h4>
                                        <p>
                                            Free shipping on orders over $50,
                                            with most items delivered within 2-3
                                            business days.
                                        </p>
                                    </div>
                                </div>
                                <div className={differentItem}>
                                    <FaUsers className={differentIcon} />
                                    <div>
                                        <h4>Expert Support</h4>
                                        <p>
                                            Our customer service team knows our
                                            products inside out and is ready to
                                            help you find exactly what you need.
                                        </p>
                                    </div>
                                </div>
                                <div className={differentItem}>
                                    <FaBoxOpen className={differentIcon} />
                                    <div>
                                        <h4>Curated Selection</h4>
                                        <p>
                                            We don't sell everything – we sell
                                            only the best. Every product is
                                            handpicked for quality and value.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className={timelineSection}>
                    <div className={containerSection}>
                        <h2 className={sectionTitle}>Our Journey</h2>
                        <p className={sectionSubtitle}>
                            Milestones that shaped our story
                        </p>
                        <div className={timeline}>
                            <div className={timelineItem}>
                                <div className={timelineDot}></div>
                                <div className={timelineDate}>2024</div>
                                <div className={timelineContent}>
                                    <h4>The Beginning</h4>
                                    <p>
                                        Started with a vision to make quality
                                        lifestyle products accessible to
                                        everyone.
                                    </p>
                                </div>
                            </div>
                            <div className={timelineItem}>
                                <div className={timelineDot}></div>
                                <div className={timelineDate}>2024 Q2</div>
                                <div className={timelineContent}>
                                    <h4>First 1000 Customers</h4>
                                    <p>
                                        Reached our first major milestone with
                                        overwhelming customer support.
                                    </p>
                                </div>
                            </div>
                            <div className={timelineItem}>
                                <div className={timelineDot}></div>
                                <div className={timelineDate}>2024 Q3</div>
                                <div className={timelineContent}>
                                    <h4>Product Expansion</h4>
                                    <p>
                                        Expanded our catalog to include over 500
                                        premium products across multiple
                                        categories.
                                    </p>
                                </div>
                            </div>
                            <div className={timelineItem}>
                                <div className={timelineDot}></div>
                                <div className={timelineDate}>2024 Q4</div>
                                <div className={timelineContent}>
                                    <h4>Sustainability Initiative</h4>
                                    <p>
                                        Launched our eco-friendly packaging and
                                        carbon-neutral shipping program.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Trust Section */}
                <div className={trustSection}>
                    <div className={containerSection}>
                        <h2 className={sectionTitle}>Trusted by Thousands</h2>
                        <p className={sectionSubtitle}>
                            Numbers that speak for themselves
                        </p>
                        <div className={trustGrid}>
                            <div className={trustCard}>
                                <FaAward className={trustIcon} />
                                <div className={trustNumber}>4.9/5</div>
                                <div className={trustLabel}>Average Rating</div>
                            </div>
                            <div className={trustCard}>
                                <FaUsers className={trustIcon} />
                                <div className={trustNumber}>50,000+</div>
                                <div className={trustLabel}>
                                    Happy Customers
                                </div>
                            </div>
                            <div className={trustCard}>
                                <FaGlobe className={trustIcon} />
                                <div className={trustNumber}>25+</div>
                                <div className={trustLabel}>
                                    Countries Served
                                </div>
                            </div>
                            <div className={trustCard}>
                                <FaBoxOpen className={trustIcon} />
                                <div className={trustNumber}>1,000+</div>
                                <div className={trustLabel}>
                                    Products Available
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className={testimonialSection}>
                    <div className={containerSection}>
                        <h2 className={sectionTitle}>What Our Customers Say</h2>
                        <p className={sectionSubtitle}>
                            Real experiences from real customers
                        </p>
                        <div className={testimonialGrid}>
                            <div className={testimonialCard}>
                                <FaQuoteLeft className={styles.quoteIcon} />
                                <p className={testimonialText}>
                                    "The quality of products exceeded my
                                    expectations. Customer service is
                                    outstanding, and shipping was incredibly
                                    fast. I've found my go-to online store!"
                                </p>
                                <div className={testimonialAuthor}>
                                    Sarah Johnson
                                </div>
                                <div className={testimonialRole}>
                                    Verified Customer
                                </div>
                                <div className={testimonialStars}>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                            </div>
                            <div className={testimonialCard}>
                                <FaQuoteLeft className={styles.quoteIcon} />
                                <p className={testimonialText}>
                                    "I love how carefully curated their
                                    selection is. Every item I've purchased has
                                    been high-quality and exactly as described.
                                    The attention to detail is impressive."
                                </p>
                                <div className={testimonialAuthor}>
                                    Michael Chen
                                </div>
                                <div className={testimonialRole}>
                                    Regular Shopper
                                </div>
                                <div className={testimonialStars}>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                            </div>
                            <div className={testimonialCard}>
                                <FaQuoteLeft className={styles.quoteIcon} />
                                <p className={testimonialText}>
                                    "Finally, an e-commerce site that gets it
                                    right. Great products, fair prices, and
                                    customer service that actually cares. Highly
                                    recommend!"
                                </p>
                                <div className={testimonialAuthor}>
                                    Emily Rodriguez
                                </div>
                                <div className={testimonialRole}>
                                    First-time Buyer
                                </div>
                                <div className={testimonialStars}>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className={ctaSection}>
                    <div className={ctaContent}>
                        <h2 className={ctaTitle}>
                            Ready to Discover Something Amazing?
                        </h2>
                        <p className={ctaText}>
                            Join thousands of satisfied customers who have
                            transformed their lifestyle with our premium
                            products. Your journey to quality living starts
                            here.
                        </p>
                        <div className={ctaButtons}>
                            <button
                                onClick={() => navigate('/shop')}
                                className={ctaBtn}
                            >
                                Explore Products <FaArrowRight />
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className={ctaBtn}
                            >
                                View Collections <FaBoxOpen />
                            </button>
                        </div>
                    </div>
                </div>

                <MyFooter />
            </div>
        </div>
    );
}

export default AboutUs;
