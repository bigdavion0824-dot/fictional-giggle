import { propertyTypes } from '../data/properties';

export default function SearchFilters({ filters, onFilterChange }) {
  const { search, minPrice, maxPrice, minBeds, minBaths, type, sort } = filters;

  const handle = (key) => (e) => onFilterChange({ ...filters, [key]: e.target.value });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search city, address, or zip..."
          value={search}
          onChange={handle('search')}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <select value={minPrice} onChange={handle('minPrice')} className="col-span-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Min Price</option>
          {[200000,300000,400000,500000,600000,750000,1000000].map(p => (
            <option key={p} value={p}>${(p/1000).toFixed(0)}k</option>
          ))}
        </select>
        <select value={maxPrice} onChange={handle('maxPrice')} className="col-span-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Max Price</option>
          {[300000,400000,500000,600000,750000,1000000,1500000].map(p => (
            <option key={p} value={p}>${(p/1000).toFixed(0)}k</option>
          ))}
        </select>
        <select value={minBeds} onChange={handle('minBeds')} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Beds</option>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ bd</option>)}
        </select>
        <select value={minBaths} onChange={handle('minBaths')} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Baths</option>
          {[1,2,3,4].map(n => <option key={n} value={n}>{n}+ ba</option>)}
        </select>
        <select value={type} onChange={handle('type')} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">All Types</option>
          {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sort} onChange={handle('sort')} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="sqft">Largest</option>
        </select>
      </div>
    </div>
  );
}
