// Scroll thresholds
export const SCROLL_THRESHOLD = 200;

// Compare list limits
export const MAX_COMPARE_ITEMS = 4;

// Cookie expiration (in days)
export const COOKIE_EXPIRATION = {
    REMEMBER_ME: 30,
    SESSION: 1
};

// Product limits
export const PRODUCT_LIMITS = {
    HOMEPAGE: 12,
    POPULAR: 10
};

// Sort types
export const SORT_TYPES = {
    NEWEST: '0',
    PRICE_LOW_TO_HIGH: '1',
    PRICE_HIGH_TO_LOW: '2',
    NAME_A_TO_Z: '3',
    NAME_Z_TO_A: '4'
};

// Pagination
export const DEFAULT_PAGE = 1;

// Toast messages
export const TOAST_MESSAGES = {
    LOGIN_REQUIRED: 'Please login to add products to cart',
    SIZE_REQUIRED: 'Please choose a size',
    ADD_TO_CART_SUCCESS: 'Product added to cart',
    ADD_TO_WISHLIST_SUCCESS: 'Added to wishlist',
    REMOVE_FROM_WISHLIST: 'Removed from wishlist',
    ADD_TO_COMPARE_SUCCESS: 'Added to compare',
    REMOVE_FROM_COMPARE: 'Removed from compare',
    COMPARE_LIST_FULL: 'Compare list is full (max 4 items) or item already exists',
    COMPARE_LIST_CLEARED: 'Compare list cleared',
    WISHLIST_EMPTY: 'Your wishlist is empty',
    ADD_INDIVIDUALLY: 'Please add items individually with size selection',
    LOGIN_SUCCESS: 'Login successful!',
    GOOGLE_LOGIN_COMING_SOON: 'Google login coming soon!',
    FACEBOOK_LOGIN_COMING_SOON: 'Facebook login coming soon!',
    TWITTER_LOGIN_COMING_SOON: 'Twitter login coming soon!',
    INVALID_PROVIDER: 'Invalid provider',
    SOCIAL_LOGIN_FAILED: 'Social login failed'
};
