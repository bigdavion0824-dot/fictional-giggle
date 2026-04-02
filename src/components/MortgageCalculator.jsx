import { useState } from 'react';
import { formatPrice } from '../data/properties';

export default function MortgageCalculator({ initialPrice = 400000 }) {
  const [homePrice, setHomePrice] = useState(initialPrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(7.0);
  const [term, setTerm] = useState(30);
  const [taxRate, setTaxRate] = useState(1.2);
  const [insuranceRate, setInsuranceRate] = useState(0.5);

  const downAmt = Math.round(homePrice * downPct / 100);
  const loanAmt = homePrice - downAmt;
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;

  let pi = 0;
  if (monthlyRate > 0) {
    pi = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    pi = loanAmt / numPayments;
  }

  const taxes = homePrice * taxRate / 100 / 12;
  const insurance = homePrice * insuranceRate / 100 / 12;
  const pmi = downPct < 20 ? loanAmt * 0.005 / 12 : 0;
  const total = pi + taxes + insurance + pmi;

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Home Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input type="number" value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} className={`${inputClass} pl-7`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Down Payment: {downPct}% ({formatPrice(downAmt)})</label>
          <input type="range" min={3} max={50} value={downPct} onChange={e => setDownPct(Number(e.target.value))} className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>3%</span><span>50%</span></div>
        </div>
        <div>
          <label className={labelClass}>Interest Rate: {rate}%</label>
          <input type="range" min={2} max={12} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>2%</span><span>12%</span></div>
        </div>
        <div>
          <label className={labelClass}>Loan Term</label>
          <div className="flex gap-3">
            {[15, 20, 30].map(t => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${term === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}
              >
                {t} yr
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Property Tax Rate (%/yr)</label>
            <input type="number" step={0.1} value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Home Insurance (%/yr)</label>
            <input type="number" step={0.1} value={insuranceRate} onChange={e => setInsuranceRate(Number(e.target.value))} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <p className="text-blue-200 text-sm font-medium mb-1">Estimated Monthly Payment</p>
        <p className="text-5xl font-bold mb-2">{formatPrice(Math.round(total))}<span className="text-blue-200 text-xl font-normal">/mo</span></p>
        <p className="text-blue-200 text-sm mb-6">Loan amount: {formatPrice(loanAmt)}</p>
        <div className="space-y-3">
          {[
            { label: 'Principal & Interest', value: pi, color: 'bg-white' },
            { label: 'Property Tax', value: taxes, color: 'bg-blue-300' },
            { label: 'Home Insurance', value: insurance, color: 'bg-blue-400' },
            ...(pmi > 0 ? [{ label: 'PMI (< 20% down)', value: pmi, color: 'bg-yellow-300' }] : []),
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                <span className="text-sm text-blue-100">{item.label}</span>
              </div>
              <span className="font-semibold">{formatPrice(Math.round(item.value))}</span>
            </div>
          ))}
          <div className="border-t border-blue-500 pt-3 flex justify-between">
            <span className="text-sm font-semibold">Total Monthly</span>
            <span className="font-bold text-lg">{formatPrice(Math.round(total))}</span>
          </div>
        </div>
        {downPct < 20 && (
          <div className="mt-4 bg-yellow-400/20 border border-yellow-300/30 rounded-xl p-3 text-xs text-yellow-100">
            💡 PMI applies when down payment is less than 20%. Consider putting more down to eliminate this cost.
          </div>
        )}
        <div className="mt-4 bg-blue-900/40 rounded-xl p-3">
          <p className="text-xs text-blue-200">Total cost over {term} years: <span className="text-white font-semibold">{formatPrice(Math.round(total * numPayments))}</span></p>
          <p className="text-xs text-blue-200 mt-1">Total interest paid: <span className="text-white font-semibold">{formatPrice(Math.round(pi * numPayments - loanAmt))}</span></p>
        </div>
      </div>
    </div>
  );
}
