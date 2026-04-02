import { Link } from 'react-router-dom';
import { formatPrice } from '../data/properties';

export default function PropertyCard({ property }) {
  const { id, address, city, state, price, beds, baths, sqft, type, daysOnMarket, images } = property;
  return (
    <Link to={`/property/${id}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden h-52">
        <img
          src={`https://picsum.photos/800/600?random=${images[0]}`}
          alt={address}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{type}</span>
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-700 text-xs font-medium px-2 py-1 rounded-full">{daysOnMarket}d on market</span>
      </div>
      <div className="p-4">
        <p className="text-2xl font-bold text-gray-900">{formatPrice(price)}</p>
        <p className="text-gray-600 text-sm mt-1 truncate">{address}, {city}, {state}</p>
        <div className="flex items-center gap-4 mt-3 text-gray-600 text-sm border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 6h18M3 18h18" /></svg>
            {beds} bd
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16M4 8h16v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z" /></svg>
            {baths} ba
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 8h16M4 8l-2 12h20L16 8" /></svg>
            {sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}
