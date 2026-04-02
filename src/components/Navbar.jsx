import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Listings' },
    { to: '/calculator', label: 'Mortgage Calculator' },
    { to: '/guide', label: 'Buying Guide' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 text-blue-700 font-bold text-xl">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h4a1 1 0 001-1v-3h2v3a1 1 0 001 1h4a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            HomeFirst
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5' : 'text-gray-600 hover:text-blue-600'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="mailto:help@homefirst.com"
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get Help
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100">
            {open
              ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-2">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
