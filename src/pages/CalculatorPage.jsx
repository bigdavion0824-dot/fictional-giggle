import MortgageCalculator from '../components/MortgageCalculator';
import { Link } from 'react-router-dom';

export default function CalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mortgage Calculator</h1>
        <p className="text-gray-500 max-w-2xl">
          Estimate your monthly mortgage payment including principal, interest, taxes, insurance, and PMI. Adjust the inputs to explore different scenarios.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
        <MortgageCalculator />
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            icon: '🏦',
            title: 'Get Pre-Approved',
            text: "A pre-approval letter shows sellers you're serious and tells you exactly how much you can borrow before shopping.",
          },
          {
            icon: '💰',
            title: '20% Down Advantage',
            text: 'Putting 20% or more down eliminates PMI (Private Mortgage Insurance), saving you hundreds per month.',
          },
          {
            icon: '📊',
            title: 'Shop Your Rate',
            text: 'Even a 0.5% rate difference on a $400k loan saves over $40,000 over 30 years. Get quotes from 3+ lenders.',
          },
          {
            icon: '🔢',
            title: 'DTI Ratio Matters',
            text: 'Lenders prefer your total debt-to-income ratio to be below 43%. Calculate yours: total monthly debt ÷ gross income.',
          },
          {
            icon: '📅',
            title: 'Loan Term Trade-offs',
            text: '15-year loans have lower rates and save massive interest, but 30-year loans have lower payments and more flexibility.',
          },
          {
            icon: '📋',
            title: 'Read the Fine Print',
            text: 'Watch for origination fees, points, and prepayment penalties. The APR tells you the true cost of a loan.',
          },
        ].map(tip => (
          <div key={tip.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-3xl mb-3">{tip.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{tip.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-3">Ready to find a home within your budget?</p>
        <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Browse Listings →
        </Link>
      </div>
    </div>
  );
}
