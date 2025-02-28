import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import restaurantData from './restaurant-data';

export default function DineDiscover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const cuisines = [...new Set(restaurantData.map(r => r.type_of_food))];
  const locations = [...new Set(restaurantData.map(r => r["address line 2"]))];

  const filteredRestaurants = restaurantData.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.type_of_food.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || restaurant.type_of_food === selectedCuisine;
    const matchesLocation = selectedLocation === 'All' || restaurant["address line 2"] === selectedLocation;
    
    return matchesSearch && matchesCuisine && matchesLocation;
  });

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRestaurants = filteredRestaurants.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getRating = (rating) => {
    return typeof rating === 'number' ? rating.toFixed(1) : 'N/A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 p-8 font-sans">
    
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-4">
          🍴 DineDiscover
        </h1>
        <p className="text-blue-200 font-light text-lg">Find your perfect dining experience</p>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={selectedCuisine}
            onChange={(e) => {
              setSelectedCuisine(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border-0 text-blue-100 hover:bg-white/20 transition-colors"
          >
            <option value="All" className="bg-blue-900">All Cuisines</option>
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine} className="bg-blue-900">{cuisine}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border-0 text-blue-100 hover:bg-white/20 transition-colors"
          >
            <option value="All" className="bg-blue-900">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location} className="bg-blue-900">{location}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {currentRestaurants.map(restaurant => (
          <div 
            key={restaurant._id.$oid} 
            onClick={() => window.open(restaurant.URL, '_blank')}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-1 bg-yellow-400/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <FaStar className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">{getRating(restaurant.rating)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-yellow-300 font-medium text-sm uppercase tracking-wide">
                {restaurant.type_of_food}
              </p>
              <p className="text-blue-200 flex items-center gap-1 text-sm">
                <span>📍</span>
                {restaurant["address line 2"]}
              </p>
              <p className="text-blue-300/80 text-sm">{restaurant.address}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-blue-200 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          Previous
        </button>
        
        <span className="px-5 py-2.5 text-blue-200">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-blue-200 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}