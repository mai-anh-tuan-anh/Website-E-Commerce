/**
 * Product Data Integration
 * Shows how different AIs use product datasets
 */
export class ProductDataIntegration {
  constructor(productDataset = []) {
    this.products = productDataset;
    this.categories = this.extractCategories();
    this.priceRanges = this.definePriceRanges();
  }

  // Sample product dataset structure
  static getSampleDataset() {
    return [
      {
        id: 1,
        name: "Wireless Headphones Pro",
        category: "Electronics",
        subcategory: "Audio",
        price: 299.99,
        brand: "TechSound",
        rating: 4.5,
        reviews: 234,
        inStock: true,
        features: ["Noise Cancellation", "Bluetooth 5.0", "30hr Battery"],
        tags: ["premium", "wireless", "professional"],
        popularity: 85,
        discount: 10
      },
      {
        id: 2,
        name: "Smart Watch Ultra",
        category: "Electronics", 
        subcategory: "Wearables",
        price: 449.99,
        brand: "TechTime",
        rating: 4.7,
        reviews: 512,
        inStock: true,
        features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
        tags: ["fitness", "smart", "health"],
        popularity: 92,
        discount: 15
      },
      {
        id: 3,
        name: "Organic Cotton T-Shirt",
        category: "Clothing",
        subcategory: "Tops",
        price: 29.99,
        brand: "EcoWear",
        rating: 4.2,
        reviews: 89,
        inStock: true,
        features: ["100% Organic", "Sustainable", "Soft"],
        tags: ["eco-friendly", "casual", "comfortable"],
        popularity: 67,
        discount: 20
      },
      {
        id: 4,
        name: "Running Shoes Elite",
        category: "Sports",
        subcategory: "Footwear",
        price: 189.99,
        brand: "SpeedRun",
        rating: 4.6,
        reviews: 445,
        inStock: false,
        features: ["Cushioned Sole", "Breathable", "Lightweight"],
        tags: ["athletic", "performance", "comfort"],
        popularity: 78,
        discount: 0
      }
    ];
  }

  extractCategories() {
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.map(cat => ({
      name: cat,
      subcategories: [...new Set(this.products.filter(p => p.category === cat).map(p => p.subcategory))]
    }));
  }

  definePriceRanges() {
    const prices = this.products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    
    return [
      { name: 'budget', min: min, max: min + range * 0.33 },
      { name: 'mid-range', min: min + range * 0.33, max: min + range * 0.67 },
      { name: 'premium', min: min + range * 0.67, max: max }
    ];
  }

  // CONSULTANT AI: Product Recommendation Logic
  generateRecommendations(userPreferences, limit = 3) {
    let filtered = [...this.products];

    // Filter by category
    if (userPreferences.categories?.length > 0) {
      filtered = filtered.filter(p => 
        userPreferences.categories.includes(p.category)
      );
    }

    // Filter by price range
    if (userPreferences.priceRange) {
      const range = this.priceRanges.find(r => r.name === userPreferences.priceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Filter by brand preferences
    if (userPreferences.brandPreferences?.length > 0) {
      filtered = filtered.filter(p => 
        userPreferences.brandPreferences.includes(p.brand)
      );
    }

    // Filter in stock items
    filtered = filtered.filter(p => p.inStock);

    // Sort by relevance (popularity + rating)
    filtered.sort((a, b) => {
      const scoreA = (a.popularity * 0.6) + (a.rating * 10 * 0.4);
      const scoreB = (b.popularity * 0.6) + (b.rating * 10 * 0.4);
      return scoreB - scoreA;
    });

    return filtered.slice(0, limit);
  }

  // CONSULTANT AI: Product Comparison
  compareProducts(productIds) {
    const products = productIds.map(id => 
      this.products.find(p => p.id === id)
    ).filter(Boolean);

    if (products.length < 2) return null;

    const comparison = {
      products: products,
      features: this.getCommonFeatures(products),
      differences: this.getKeyDifferences(products),
      recommendation: this.getBestValue(products)
    };

    return comparison;
  }

  getCommonFeatures(products) {
    const allFeatures = products.flatMap(p => p.features);
    const featureCounts = {};
    
    allFeatures.forEach(feature => {
      featureCounts[feature] = (featureCounts[feature] || 0) + 1;
    });

    return Object.entries(featureCounts)
      .filter(([_, count]) => count === products.length)
      .map(([feature]) => feature);
  }

  getKeyDifferences(products) {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      uniqueFeatures: product.features.filter(f => 
        !products.every(p => p.id === product.id || p.features.includes(f))
      ),
      priceAdvantage: product.price === Math.min(...products.map(p => p.price)),
      ratingAdvantage: product.rating === Math.max(...products.map(p => p.rating))
    }));
  }

  getBestValue(products) {
    return products.reduce((best, current) => {
      const bestScore = (best.rating * 10) - (best.price / 10);
      const currentScore = (current.rating * 10) - (current.price / 10);
      return currentScore > bestScore ? current : best;
    });
  }

  // MARKETING AI: Bundle and Deal Creation
  generateBundles(intent, limit = 3) {
    const bundles = [];

    // Create category-based bundles
    this.categories.forEach(category => {
      const categoryProducts = this.products.filter(p => 
        p.category === category.name && p.inStock
      );

      if (categoryProducts.length >= 2) {
        // Create complementary bundle
        const bundle = this.createBundle(categoryProducts.slice(0, 3), 'category');
        if (bundle) bundles.push(bundle);
      }
    });

    // Create price-based bundles
    const premiumProducts = this.products.filter(p => 
      p.price > 200 && p.inStock
    );

    if (premiumProducts.length >= 2) {
      const bundle = this.createBundle(premiumProducts.slice(0, 2), 'premium');
      if (bundle) bundles.push(bundle);
    }

    // Create trending bundles
    const trendingProducts = this.products
      .filter(p => p.popularity > 80 && p.inStock)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);

    if (trendingProducts.length >= 2) {
      const bundle = this.createBundle(trendingProducts, 'trending');
      if (bundle) bundles.push(bundle);
    }

    return bundles.slice(0, limit);
  }

  createBundle(products, bundleType) {
    if (products.length < 2) return null;

    const totalOriginalPrice = products.reduce((sum, p) => sum + p.price, 0);
    const bundleDiscount = bundleType === 'premium' ? 20 : 15;
    const bundlePrice = totalOriginalPrice * (1 - bundleDiscount / 100);

    return {
      id: `bundle_${bundleType}_${Date.now()}`,
      name: `${bundleType.charAt(0).toUpperCase() + bundleType.slice(1)} Bundle`,
      products: products,
      originalPrice: totalOriginalPrice,
      bundlePrice: bundlePrice,
      discount: bundleDiscount,
      savings: totalOriginalPrice - bundlePrice,
      urgency: bundleType === 'trending' ? 'high' : 'medium',
      description: this.generateBundleDescription(products, bundleType)
    };
  }

  generateBundleDescription(products, bundleType) {
    const descriptions = {
      category: `Complete your ${products[0].category} collection with these essential items!`,
      premium: `Experience the best with our premium selection of top-tier products!`,
      trending: `Join thousands of satisfied customers with these trending products!`
    };

    return descriptions[bundleType] || 'Great value bundle deal!';
  }

  // MARKETING AI: Flash Deals and Urgency
  generateFlashDeals(limit = 5) {
    const availableProducts = this.products.filter(p => p.inStock);
    
    // Select products for flash deals
    const flashDeals = availableProducts
      .filter(p => p.popularity > 70) // Popular products
      .sort(() => Math.random() - 0.5) // Shuffle
      .slice(0, limit)
      .map(product => ({
        ...product,
        flashDiscount: Math.floor(Math.random() * 20) + 10, // 10-30% discount
        timeLeft: this.generateRandomTimeLeft(),
        stockWarning: Math.random() > 0.7 ? `Only ${Math.floor(Math.random() * 10) + 1} left!` : null
      }));

    return flashDeals;
  }

  generateRandomTimeLeft() {
    const hours = Math.floor(Math.random() * 23) + 1;
    const minutes = Math.floor(Math.random() * 59) + 1;
    return `${hours}h ${minutes}m`;
  }

  // TECHNICAL AI: Product Specifications
  getProductSpecifications(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return null;

    return {
      basicInfo: {
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        inStock: product.inStock
      },
      specifications: {
        features: product.features,
        tags: product.tags,
        rating: product.rating,
        reviews: product.reviews
      },
      availability: {
        inStock: product.inStock,
        estimatedDelivery: this.getEstimatedDelivery(product),
        returnPolicy: "30-day return policy",
        warranty: "1-year manufacturer warranty"
      }
    };
  }

  getEstimatedDelivery(product) {
    if (!product.inStock) return "Out of stock";
    
    const deliveryTimes = {
      "Electronics": "2-3 business days",
      "Clothing": "3-5 business days", 
      "Sports": "2-4 business days"
    };

    return deliveryTimes[product.category] || "3-5 business days";
  }

  // Helper methods for all AIs
  searchProducts(query, filters = {}) {
    let results = [...this.products];

    // Text search
    if (query) {
      const queryLower = query.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(queryLower))
      );
    }

    // Apply filters
    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }

    if (filters.minPrice) {
      results = results.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      results = results.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.inStockOnly) {
      results = results.filter(p => p.inStock);
    }

    return results;
  }

  getPopularProducts(limit = 10) {
    return this.products
      .filter(p => p.inStock)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }
}
