"use client";

import React, { useState, useMemo } from 'react';
import { Search, TrendingDown, List, MapPin, X, Tag, ChevronDown } from 'lucide-react';

const GroceryComparison = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [shoppingLists, setShoppingLists] = useState({});
  const [activeTab, setActiveTab] = useState('products');
  const [selectedDealMarket, setSelectedDealMarket] = useState('all');
  const [showListModal, setShowListModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const supermarkets = [
    { id: 1, name: 'Keells Super', color: 'bg-red-500' },
    { id: 2, name: 'Arpico Supercenter', color: 'bg-blue-500' },
    { id: 3, name: 'Cargills Food City', color: 'bg-green-500' },
    { id: 4, name: 'Laugfs Supermarket', color: 'bg-orange-500' }
  ];

  const categories = [
    'all', 'Rice & Grains', 'Vegetables', 'Fruits', 'Dairy', 'Meat & Fish', 'Beverages', 'Snacks'
  ];

  const products = [
    {
      id: 1,
      name: 'Basmati Rice',
      category: 'Rice & Grains',
      unit: '5kg',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 1850, location: 'Colombo 03' },
        { supermarket: 2, price: 1790, location: 'Nugegoda' },
        { supermarket: 3, price: 1820, location: 'Maharagama' },
        { supermarket: 4, price: 1875, location: 'Dehiwala' }
      ]
    },
    {
      id: 2,
      name: 'Red Onions',
      category: 'Vegetables',
      unit: '1kg',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 280, location: 'Colombo 03' },
        { supermarket: 2, price: 265, location: 'Nugegoda' },
        { supermarket: 3, price: 275, location: 'Maharagama' },
        { supermarket: 4, price: 290, location: 'Dehiwala' }
      ]
    },
    {
      id: 3,
      name: 'Fresh Milk',
      category: 'Dairy',
      unit: '1L',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 390, location: 'Colombo 03' },
        { supermarket: 2, price: 385, location: 'Nugegoda' },
        { supermarket: 3, price: 395, location: 'Maharagama' },
        { supermarket: 4, price: 390, location: 'Dehiwala' }
      ]
    },
    {
      id: 4,
      name: 'Chicken (Dressed)',
      category: 'Meat & Fish',
      unit: '1kg',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 890, location: 'Colombo 03' },
        { supermarket: 2, price: 870, location: 'Nugegoda' },
        { supermarket: 3, price: 885, location: 'Maharagama' },
        { supermarket: 4, price: 895, location: 'Dehiwala' }
      ]
    },
    {
      id: 5,
      name: 'Bananas (Ambul)',
      category: 'Fruits',
      unit: '1kg',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 250, location: 'Colombo 03' },
        { supermarket: 2, price: 240, location: 'Nugegoda' },
        { supermarket: 3, price: 245, location: 'Maharagama' },
        { supermarket: 4, price: 255, location: 'Dehiwala' }
      ]
    },
    {
      id: 6,
      name: 'Coca Cola',
      category: 'Beverages',
      unit: '1.5L',
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 350, location: 'Colombo 03' },
        { supermarket: 2, price: 340, location: 'Nugegoda' },
        { supermarket: 3, price: 345, location: 'Maharagama' },
        { supermarket: 4, price: 350, location: 'Dehiwala' }
      ]
    },
    {
      id: 7,
      name: 'White Rice (Samba)',
      category: 'Rice & Grains',
      unit: '5kg',
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 1450, location: 'Colombo 03' },
        { supermarket: 2, price: 1420, location: 'Nugegoda' },
        { supermarket: 3, price: 1435, location: 'Maharagama' },
        { supermarket: 4, price: 1460, location: 'Dehiwala' }
      ]
    },
    {
      id: 8,
      name: 'Potatoes',
      category: 'Vegetables',
      unit: '1kg',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
      prices: [
        { supermarket: 1, price: 310, location: 'Colombo 03' },
        { supermarket: 2, price: 295, location: 'Nugegoda' },
        { supermarket: 3, price: 305, location: 'Maharagama' },
        { supermarket: 4, price: 315, location: 'Dehiwala' }
      ]
    }
  ];

  const deals = [
    {
      id: 101,
      supermarket: 1,
      productName: 'Basmati Rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
      originalPrice: 1850,
      dealPrice: 1650,
      discount: 11,
      validUntil: '2025-11-25',
      description: 'Weekend Special - Premium Basmati'
    },
    {
      id: 102,
      supermarket: 2,
      productName: 'Fresh Milk Bundle',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
      originalPrice: 1170,
      dealPrice: 999,
      discount: 15,
      validUntil: '2025-11-22',
      description: 'Buy 3 Get 15% Off'
    },
    {
      id: 103,
      supermarket: 3,
      productName: 'Chicken Combo',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&h=200&fit=crop',
      originalPrice: 890,
      dealPrice: 750,
      discount: 16,
      validUntil: '2025-11-20',
      description: 'Fresh Chicken - Daily Deal'
    },
    {
      id: 104,
      supermarket: 4,
      productName: 'Vegetable Pack',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
      originalPrice: 850,
      dealPrice: 699,
      discount: 18,
      validUntil: '2025-11-21',
      description: 'Mixed Vegetables 5kg'
    },
    {
      id: 105,
      supermarket: 1,
      productName: 'Beverage Bundle',
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&h=200&fit=crop',
      originalPrice: 1050,
      dealPrice: 899,
      discount: 14,
      validUntil: '2025-11-24',
      description: '3x 1.5L Soft Drinks'
    },
    {
      id: 106,
      supermarket: 2,
      productName: 'Banana Bunch',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop',
      originalPrice: 240,
      dealPrice: 199,
      discount: 17,
      validUntil: '2025-11-19',
      description: 'Fresh from Farm - 1kg'
    }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesMarket = selectedDealMarket === 'all' || deal.supermarket === parseInt(selectedDealMarket);
      return matchesMarket;
    });
  }, [selectedDealMarket]);

  const getBestPrice = (prices) => {
    return Math.min(...prices.map(p => p.price));
  };

  const getPriceDifference = (prices) => {
    const best = getBestPrice(prices);
    const worst = Math.max(...prices.map(p => p.price));
    return worst - best;
  };

  const openListModal = (product, supermarketId, price) => {
    setSelectedItem({ product, supermarketId, price });
    setShowListModal(true);
  };

  const addToList = (supermarketId) => {
    if (!selectedItem) return;

    const listKey = `market_${supermarketId}`;
    const currentList = shoppingLists[listKey] || [];

    const newItem = {
      id: Date.now(),
      productId: selectedItem.product.id,
      productName: selectedItem.product.name,
      unit: selectedItem.product.unit,
      image: selectedItem.product.image,
      price: selectedItem.price,
      supermarketId: supermarketId
    };

    setShoppingLists({
      ...shoppingLists,
      [listKey]: [...currentList, newItem]
    });

    setShowListModal(false);
    setSelectedItem(null);
  };

  const removeFromList = (supermarketId, itemId) => {
    const listKey = `market_${supermarketId}`;
    const currentList = shoppingLists[listKey] || [];
    setShoppingLists({
      ...shoppingLists,
      [listKey]: currentList.filter(item => item.id !== itemId)
    });
  };

  const getListTotal = (supermarketId) => {
    const listKey = `market_${supermarketId}`;
    const list = shoppingLists[listKey] || [];
    return list.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 sm:mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-700">🛒 {"LK Price Compare"}</h1>
            <div className="text-xs sm:text-sm text-gray-600">{"Sri Lanka's Grocery Comparison"}</div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-3 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'products'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'deals'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <Tag className="inline mr-1" size={16} />
              Deals
            </button>
            <button
              onClick={() => setActiveTab('lists')}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'lists'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <List className="inline mr-1" size={16} />
              My Lists
            </button>
          </div>

          {/* Search and Filters */}
          {activeTab === 'products' && (
            <>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTab === 'deals' && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedDealMarket('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedDealMarket === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                All Deals
              </button>
              {supermarkets.map(market => (
                <button
                  key={market.id}
                  onClick={() => setSelectedDealMarket(market.id.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedDealMarket === market.id.toString()
                    ? `${market.color} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {market.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {filteredProducts.map(product => {
              const bestPrice = getBestPrice(product.prices);
              const priceDiff = getPriceDifference(product.prices);

              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4 mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{product.name}</h3>
                        <div className="flex flex-wrap gap-2 items-center mt-1">
                          <span className="text-sm text-gray-500">{product.unit}</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                        {priceDiff > 0 && (
                          <div className="mt-2 sm:hidden">
                            <span className="text-xs text-gray-600">Save up to </span>
                            <span className="text-sm font-bold text-green-600">Rs. {priceDiff}</span>
                          </div>
                        )}
                      </div>
                      {priceDiff > 0 && (
                        <div className="text-right hidden sm:block">
                          <div className="text-sm text-gray-600">Save up to</div>
                          <div className="text-lg font-bold text-green-600">Rs. {priceDiff}</div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {product.prices.map(priceInfo => {
                        const market = supermarkets.find(m => m.id === priceInfo.supermarket);
                        const isBest = priceInfo.price === bestPrice;

                        return (
                          <div
                            key={priceInfo.supermarket}
                            className={`border-2 rounded-lg p-2 sm:p-3 transition-all ${isBest ? 'border-green-500 bg-green-50' : 'border-gray-200'
                              }`}
                          >
                            <div className={`text-xs font-semibold mb-1 truncate ${market?.color.replace('bg-', 'text-')}`}>
                              {market?.name}
                            </div>
                            <div className="flex items-baseline gap-1 mb-1">
                              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                                {priceInfo.price}
                              </span>
                              <span className="text-xs text-gray-600">LKR</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-2 truncate">
                              <MapPin size={10} />
                              <span className="truncate">{priceInfo.location}</span>
                            </div>
                            {isBest && (
                              <div className="flex items-center gap-1 text-xs font-semibold text-green-600 mb-2">
                                <TrendingDown size={12} />
                                Best Price
                              </div>
                            )}
                            <button
                              onClick={() => openListModal(product, priceInfo.supermarket, priceInfo.price)}
                              className={`w-full py-1.5 px-2 text-xs font-medium rounded transition-colors ${isBest
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                              Add to List
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-base sm:text-lg">No products found.</p>
              </div>
            )}
          </div>
        )}

        {/* Deals Tab */}
        {activeTab === 'deals' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeals.map(deal => {
              const market = supermarkets.find(m => m.id === deal.supermarket);
              return (
                <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={deal.image}
                      alt={deal.productName}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                      {deal.discount}% OFF
                    </div>
                    <div className={`absolute top-2 left-2 ${market?.color} text-white px-2 py-1 rounded text-xs font-semibold`}>
                      {market?.name}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{deal.productName}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">{deal.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg sm:text-xl font-bold text-green-600">
                        Rs. {deal.dealPrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        Rs. {deal.originalPrice}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      Valid until: {new Date(deal.validUntil).toLocaleDateString()}
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                      View Deal
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredDeals.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-base sm:text-lg">No deals available.</p>
              </div>
            )}
          </div>
        )}

        {/* My Lists Tab */}
        {activeTab === 'lists' && (
          <div className="space-y-4">
            {supermarkets.map(market => {
              const listKey = `market_${market.id}`;
              const list = shoppingLists[listKey] || [];
              const total = getListTotal(market.id);

              return (
                <div key={market.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className={`${market.color} text-white p-3 sm:p-4`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg sm:text-xl font-bold">{market.name}</h3>
                      <div className="text-right">
                        <div className="text-xs opacity-90">Total</div>
                        <div className="text-xl sm:text-2xl font-bold">Rs. {total.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    {list.length === 0 ? (
                      <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No items in this list</p>
                    ) : (
                      <div className="space-y-2">
                        {list.map(item => (
                          <div key={item.id} className="flex gap-3 items-center border-b pb-2 last:border-b-0">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.productName}</h4>
                              <p className="text-xs sm:text-sm text-gray-500">{item.unit}</p>
                              <p className="text-sm sm:text-base font-bold text-green-600">Rs. {item.price}</p>
                            </div>
                            <button
                              onClick={() => removeFromList(market.id, item.id)}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for selecting supermarket */}
      {showListModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold">Add to Shopping List</h3>
                <button onClick={() => setShowListModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm sm:text-base text-gray-600">Select a supermarket list to add:</p>
                <p className="font-semibold text-base sm:text-lg mt-2">{selectedItem.product.name}</p>
              </div>
              <div className="space-y-2">
                {supermarkets.map(market => (
                  <button
                    key={market.id}
                    onClick={() => addToList(market.id)}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 hover:border-green-500 transition-colors text-left ${market.id === selectedItem.supermarketId ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold text-sm sm:text-base ${market.color.replace('bg-', 'text-')}`}>
                        {market.name}
                      </span>
                      {market.id === selectedItem.supermarketId && (
                        <span className="text-xs sm:text-sm text-green-600">(Selected store)</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryComparison;