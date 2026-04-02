import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties, formatPrice, formatNumber } from '../data/properties';
import MortgageCalculator from '../components/MortgageCalculator';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [showOffer, setShowOffer] = useState(false);
  const [offerData, setOfferData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!property) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-2xl font-bold text-gray-700 mb-4">Property not found</p>
      <Link to="/" className="text-blue-600 hover:underline">← Back to listings</Link>
    </div>
  );

  const { address, city, state, zip, price, beds, baths, sqft, lotSize, yearBuilt, type, description, features, images, neighborhood, agent, hoa, taxes } = property;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">Listings</Link>
        <span>›</span>
        <span>{city}, {state}</span>
        <span>›</span>
        <span className="text-gray-800 font-medium truncate">{address}</span>
      </nav>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8 rounded-2xl overflow-hidden">
        <div className="lg:col-span-2">
          <img
            src={`https://picsum.photos/800/600?random=${images[activeImg]}`}
            alt={`Property ${activeImg + 1}`}
            className="w-full h-80 lg:h-96 object-cover"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
          {images.slice(1, 5).map((img, i) => (
            <img
              key={i}
              src={`https://picsum.photos/400/300?random=${img}`}
              alt={`View ${i + 2}`}
              onClick={() => setActiveImg(i + 1)}
              className={`w-full h-24 lg:h-full object-cover cursor-pointer transition-opacity ${activeImg === i + 1 ? 'ring-2 ring-blue-500' : 'hover:opacity-90'}`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-6">
        {images.map((_, i) => (
          <button key={i} onClick={() => setActiveImg(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${activeImg === i ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">{formatPrice(price)}</p>
                <p className="text-lg text-gray-600 mt-1">{address}, {city}, {state} {zip}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">{property.status}</span>
            </div>
            <div className="flex flex-wrap gap-5 mt-4 text-gray-700">
              {[
                { label: 'Beds', value: beds },
                { label: 'Baths', value: baths },
                { label: 'Sq Ft', value: formatNumber(sqft) },
                { label: 'Lot (ac)', value: lotSize },
                { label: 'Built', value: yearBuilt },
                { label: 'Type', value: type },
              ].map(d => (
                <div key={d.label} className="bg-gray-50 rounded-xl px-4 py-2.5 text-center">
                  <p className="text-lg font-bold text-gray-900">{d.value}</p>
                  <p className="text-xs text-gray-500">{d.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">About This Home</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Features & Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2 text-gray-700 text-sm">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Costs */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Annual Costs</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-blue-700 font-medium">Property Tax</p>
                <p className="text-xl font-bold text-blue-900 mt-1">{formatPrice(taxes)}</p>
                <p className="text-xs text-blue-600">/year</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-sm text-purple-700 font-medium">HOA Fees</p>
                <p className="text-xl font-bold text-purple-900 mt-1">{hoa > 0 ? formatPrice(hoa) : 'None'}</p>
                {hoa > 0 && <p className="text-xs text-purple-600">/month</p>}
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-sm text-green-700 font-medium">Price/SqFt</p>
                <p className="text-xl font-bold text-green-900 mt-1">{formatPrice(Math.round(price / sqft))}</p>
                <p className="text-xs text-green-600">/sqft</p>
              </div>
            </div>
          </div>

          {/* Neighborhood */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Neighborhood</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Walk Score', value: neighborhood.walkScore, color: 'text-green-600' },
                { label: 'Transit Score', value: neighborhood.transitScore, color: 'text-blue-600' },
                { label: 'Bike Score', value: neighborhood.bikeScore, color: 'text-purple-600' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                  <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div className={`h-1.5 rounded-full ${s.color.replace('text-', 'bg-')}`} style={{ width: `${s.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-800 mb-2 text-sm">📚 Nearby Schools</p>
                <ul className="space-y-1">
                  {neighborhood.schools.map(s => <li key={s} className="text-xs text-gray-600 flex items-center gap-1"><span className="text-green-500">●</span>{s}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2 text-sm">📍 Points of Interest</p>
                <ul className="space-y-1">
                  {neighborhood.nearby.map(n => <li key={n} className="text-xs text-gray-600 flex items-center gap-1"><span className="text-blue-500">●</span>{n}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Location</h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl h-64 flex flex-col items-center justify-center border border-blue-200">
              <svg className="w-12 h-12 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-blue-700 font-semibold">{address}</p>
              <p className="text-blue-500 text-sm">{city}, {state} {zip}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', ' + city + ', ' + state)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs bg-white text-blue-600 border border-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>

          {/* Mortgage Calculator */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Estimate Your Payment</h2>
            <MortgageCalculator initialPrice={price} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Agent Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm sticky top-20">
            <p className="font-bold text-gray-900 mb-1">Listed by</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                {agent.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{agent.name}</p>
                <p className="text-xs text-gray-500">Listing Agent</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <p>📞 {agent.phone}</p>
              <p>✉️ {agent.email}</p>
            </div>
            <button
              onClick={() => setShowOffer(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mb-2"
            >
              Make an Offer
            </button>
            <button
              onClick={() => setShowOffer(true)}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-xl border border-gray-200 transition-colors"
            >
              Schedule a Tour
            </button>
            <Link to="/guide" className="block mt-3 text-center text-xs text-blue-600 hover:underline">
              📖 Read our buyer&apos;s guide first →
            </Link>
          </div>

          {/* Self-Rep Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="font-semibold text-amber-800 mb-2 text-sm">💡 Representing Yourself?</p>
            <ul className="text-xs text-amber-700 space-y-1.5">
              <li>✓ Get pre-approved for a mortgage before making an offer</li>
              <li>✓ Hire a real estate attorney to review contracts</li>
              <li>✓ Always request a professional home inspection</li>
              <li>✓ Research comparable sales (comps) to negotiate</li>
            </ul>
            <Link to="/guide" className="mt-3 block text-xs font-semibold text-amber-800 hover:underline">Full Guide →</Link>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOffer && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowOffer(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                <p className="text-gray-500 text-sm mb-4">We&apos;ll be in touch with you shortly about {address}.</p>
                <button onClick={() => { setShowOffer(false); setSubmitted(false); }} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Close</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Contact About This Property</h3>
                    <p className="text-sm text-gray-500">{address}, {city}, {state}</p>
                  </div>
                  <button onClick={() => setShowOffer(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input required placeholder="Your name" value={offerData.name} onChange={e => setOfferData({...offerData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input required type="email" placeholder="Email address" value={offerData.email} onChange={e => setOfferData({...offerData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Phone number" value={offerData.phone} onChange={e => setOfferData({...offerData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea rows={3} placeholder="Your message or offer details..." value={offerData.message} onChange={e => setOfferData({...offerData, message: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">Send Request</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
