import { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: 1,
    title: 'Check Your Financial Health',
    icon: '💳',
    color: 'bg-blue-100 text-blue-700',
    content: 'Before you start house hunting, get a clear picture of your finances. Check your credit score (aim for 620+ for conventional loans, 580+ for FHA). Pay down existing debt to improve your debt-to-income ratio. Save for a down payment (3-20%) plus closing costs (2-5% of loan amount).',
    tips: ['Get free credit reports from AnnualCreditReport.com', 'Aim for a DTI ratio below 43%', 'Build an emergency fund separate from your down payment', 'Avoid opening new credit accounts before applying'],
  },
  {
    num: 2,
    title: 'Get Pre-Approved for a Mortgage',
    icon: '🏦',
    color: 'bg-purple-100 text-purple-700',
    content: "A mortgage pre-approval tells you exactly how much you can borrow and shows sellers you're serious. Shop at least 3 lenders — bank, credit union, and online lender — to compare rates and fees. Rate differences of 0.5% can mean tens of thousands of dollars over the life of your loan.",
    tips: ["Gather: W-2s, pay stubs, bank statements, tax returns", "Don't confuse pre-qualification with pre-approval", 'Multiple mortgage inquiries in 14 days count as one hard pull', 'Lock your rate when you find a good one'],
  },
  {
    num: 3,
    title: 'Define Your Must-Haves',
    icon: '📋',
    color: 'bg-green-100 text-green-700',
    content: "Be clear about what you need vs. want. Location, school districts, commute time, and lot size are harder to change than paint colors. Research neighborhoods: crime rates, walkability, flood zones, and future development plans can significantly affect your quality of life and resale value.",
    tips: ['Separate "must haves" from "nice to haves"', 'Drive the commute at rush hour', 'Check school ratings at GreatSchools.org', "Look up property's flood zone at FEMA's flood map"],
  },
  {
    num: 4,
    title: 'Search Listings & Tour Homes',
    icon: '🏠',
    color: 'bg-yellow-100 text-yellow-700',
    content: "Browse listings on multiple platforms. When touring, look beyond staging — check water pressure, look for cracks, test outlets, and note the age of the roof and HVAC. Take notes and photos at each home. Don't tour more than 5-6 in one day or they'll blur together.",
    tips: ["Check permit history at the local assessor's office", 'Visit at different times of day', 'Talk to potential neighbors', 'Look up the property tax history online'],
  },
  {
    num: 5,
    title: 'Make a Competitive Offer',
    icon: '✍️',
    color: 'bg-orange-100 text-orange-700',
    content: 'Research comparable sales (comps) in the past 3-6 months within 0.5 miles to determine fair market value. In hot markets, consider escalation clauses. Your offer should include price, earnest money (1-3%), contingencies, and closing date. Hire a real estate attorney to review contracts.',
    tips: ['Order a CMA (comparative market analysis)', 'Include inspection and financing contingencies', 'Earnest money shows good faith — typical is 1-3%', 'Consider an escalation clause in competitive markets'],
  },
  {
    num: 6,
    title: 'Conduct Due Diligence',
    icon: '🔍',
    color: 'bg-teal-100 text-teal-700',
    content: "Never skip the home inspection. A licensed inspector will check structural integrity, electrical, plumbing, HVAC, roof, and more. Use inspection results to negotiate repairs or a price reduction. Also get a title search to ensure there are no liens, and consider a survey to verify boundaries.",
    tips: ['Attend the inspection in person', 'Get specialized inspections (radon, mold, sewer scope)', 'Review HOA documents if applicable', "Request seller's disclosure statements"],
  },
  {
    num: 7,
    title: 'Secure Your Financing',
    icon: '📄',
    color: 'bg-pink-100 text-pink-700',
    content: "Your lender will order an appraisal to confirm the home's value. If it comes in low, you can renegotiate the price, pay the difference in cash, or walk away. Don't make major purchases or change jobs during this period — it can derail your loan approval.",
    tips: ["Don't change jobs during the loan process", 'Avoid large bank account withdrawals', 'Be ready to explain any unusual deposits', 'Respond quickly to lender document requests'],
  },
  {
    num: 8,
    title: 'Close the Deal',
    icon: '🎉',
    color: 'bg-indigo-100 text-indigo-700',
    content: "At closing, you'll sign a mountain of paperwork. Review the Closing Disclosure 3+ days before — it lists all final costs. Bring a cashier's check or arrange a wire transfer for closing costs. Do a final walkthrough 24 hours before closing to ensure the home is in agreed condition.",
    tips: ["Review the Closing Disclosure carefully (you're entitled to it 3 days before)", 'Wire fraud is common — verify wiring instructions by phone', 'Bring valid photo ID', 'Change your address and utilities before closing day'],
  },
];

const checklistItems = [
  { category: 'Financial Prep', items: ['Check credit score', 'Calculate DTI ratio', 'Save for down payment', 'Save for closing costs (2-5%)', 'Build emergency fund', 'Organize financial documents'] },
  { category: 'Mortgage', items: ['Compare rates from 3+ lenders', 'Choose loan type (conventional, FHA, VA, USDA)', 'Get pre-approval letter', 'Understand all fees and APR', 'Consider rate lock timing'] },
  { category: 'Home Search', items: ['Define must-haves vs. nice-to-haves', 'Research neighborhoods', 'Check school ratings', 'Review flood zone maps', 'Set up listing alerts'] },
  { category: 'Making an Offer', items: ['Research comparable sales', 'Hire a real estate attorney', 'Determine earnest money amount', 'Include appropriate contingencies', 'Submit pre-approval letter with offer'] },
  { category: 'Due Diligence', items: ['Schedule home inspection', 'Review inspection report', 'Get specialized inspections if needed', 'Review HOA documents', 'Verify property boundaries'] },
  { category: 'Closing', items: ['Review Closing Disclosure', 'Do final walkthrough', 'Arrange closing funds', 'Bring valid ID to closing', 'Get keys & change locks immediately'] },
];

const negotiationTips = [
  { title: 'Know Your Comps', text: 'Research recent sales of similar homes. If you can show a property is priced above comps, you have leverage to negotiate down.' },
  { title: 'Understand Seller Motivation', text: 'Is the seller relocating quickly? Divorced? Inherited the property? Motivated sellers are more flexible on price and terms.' },
  { title: 'Use Inspection as Leverage', text: 'After inspection, ask for repairs or a credit. A $5,000 credit at closing is often more flexible for both parties than actual repairs.' },
  { title: 'Think Beyond Price', text: 'Sellers may care about a quick close, a leaseback period, or leaving appliances. Flexible terms can win deals without raising your price.' },
  { title: "Don't Reveal Your Maximum", text: "Never tell the seller or their agent what you're pre-approved for or your absolute maximum. Negotiate from the listing price, not your ceiling." },
  { title: 'Be Ready to Walk Away', text: "Your best negotiating tool is the ability to walk away. Don't get emotionally attached before you have a signed contract." },
];

export default function GuidePage() {
  const [checkedItems, setCheckedItems] = useState({});
  const [activeStep, setActiveStep] = useState(null);

  const toggleItem = (category, item) => {
    const key = `${category}:${item}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = checklistItems.reduce((a, c) => a + c.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Home Buying Guide</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Everything you need to know to represent yourself when buying a home — from credit scores to closing day.
        </p>
      </div>

      {/* Step-by-Step Guide */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The 8 Steps to Buying a Home</h2>
        <div className="space-y-4">
          {steps.map(step => (
            <div key={step.num} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setActiveStep(activeStep === step.num ? null : step.num)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${step.color}`}>
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-gray-400 font-medium">Step {step.num} of 8</span>
                  <p className="font-semibold text-gray-900">{step.title}</p>
                </div>
                <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${activeStep === step.num ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeStep === step.num && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed mt-4 mb-4">{step.content}</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-800 text-sm mb-2">Key Tips:</p>
                    <ul className="space-y-1.5">
                      {step.tips.map(tip => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Interactive Checklist</h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">{checkedCount} of {totalItems} completed</p>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {checklistItems.map(cat => (
            <div key={cat.category} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {cat.items.filter(item => checkedItems[`${cat.category}:${item}`]).length}
                </span>
                {cat.category}
              </h3>
              <ul className="space-y-2">
                {cat.items.map(item => {
                  const key = `${cat.category}:${item}`;
                  return (
                    <li key={item}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={!!checkedItems[key]}
                          onChange={() => toggleItem(cat.category, item)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className={`text-sm transition-colors ${checkedItems[key] ? 'line-through text-gray-400' : 'text-gray-700 group-hover:text-gray-900'}`}>
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Negotiation Tips */}
      <section id="negotiating" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Negotiation Strategies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {negotiationTips.map(tip => (
            <div key={tip.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to Start Your Search?</h2>
        <p className="text-blue-200 mb-6">Browse current listings or calculate your estimated mortgage payment.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Browse Listings
          </Link>
          <Link to="/calculator" className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Mortgage Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
