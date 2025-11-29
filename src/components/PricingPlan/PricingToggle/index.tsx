'use client'

interface PricingToggleProps {
    billingPeriod: 'monthly' | 'annually';
    setBillingPeriod: (period: 'monthly' | 'annually') => void;
}

export default function PricingToggle({ billingPeriod, setBillingPeriod }: PricingToggleProps) {
    return (
        <div className="relative h-10 sm:h-12 md:h-14 bg-gray-100 rounded-lg p-0.5 sm:p-1 flex items-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            {/* Selected Indicator - moves based on selection */}
            <div
                className={`absolute top-0.5 bottom-0.5 sm:top-1 sm:bottom-1 rounded-md bg-black shadow-sm transition-all duration-300 ease-in-out 
                    ${billingPeriod === 'monthly'
                        ? 'left-0.5 sm:left-1 right-[calc(50%+0.125rem)] sm:right-[calc(50%+0.25rem)]'
                        : 'left-[calc(50%+0.125rem)] sm:left-[calc(50%+0.25rem)] right-0.5 sm:right-1'
                    }`}
            />

            {/* Monthly Option */}
            <button
                onClick={() => setBillingPeriod('monthly')}
                className={`relative z-10 flex-1 h-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 cursor-pointer hover:opacity-80 ${billingPeriod === 'monthly'
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                Monthly
            </button>

            {/* Annually Option */}
            <button
                onClick={() => setBillingPeriod('annually')}
                className={`relative z-10 flex-1 h-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 cursor-pointer hover:opacity-80 flex items-center justify-center ${billingPeriod === 'annually'
                    ? 'text-white'
                    : 'text-black hover:text-gray-700'
                    }`}
            >
                <span>Annually</span>
                <span
                    className="text-white ml-1 sm:ml-2 text-[10px] sm:text-[11px] md:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: "#364050" }}
                >
                    -20%
                </span>
            </button>
        </div>
    );
}

