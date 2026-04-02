import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h4a1 1 0 001-1v-3h2v3a1 1 0 001 1h4a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              HomeFirst
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering everyday people to navigate the home buying process with confidence — no agent required.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">All Listings</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link to="/guide" className="hover:text-white transition-colors">Buying Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guide" className="hover:text-white transition-colors">First-Time Buyers</Link></li>
              <li><Link to="/guide#negotiating" className="hover:text-white transition-colors">Negotiation Tips</Link></li>
              <li><Link to="/guide#checklist" className="hover:text-white transition-colors">Closing Checklist</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:help@homefirst.com" className="hover:text-white transition-colors">help@homefirst.com</a></li>
              <li><a href="tel:+18005550100" className="hover:text-white transition-colors">1-800-555-0100</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} HomeFirst. For informational purposes only. Not a licensed brokerage.
        </div>
      </div>
    </footer>
  );
}
