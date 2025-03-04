import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  badge?: string;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out VoiceForm",
    features: [
      "5 forms per month",
      "Basic voice recognition",
      "Standard support",
      "1 language (English)",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$12",
    description: "For professionals and small teams",
    features: [
      "Unlimited forms",
      "Advanced voice recognition",
      "Priority support",
      "5 languages",
      "Custom branding",
    ],
    buttonText: "Start Free Trial",
    highlighted: true,
    badge: "Popular",
  },
  {
    name: "Enterprise",
    price: "$49",
    description: "For organizations with advanced needs",
    features: [
      "Unlimited forms",
      "Premium voice recognition",
      "Dedicated support",
      "All languages",
      "Custom branding",
      "API access",
      "Advanced analytics",
    ],
    buttonText: "Contact Sales",
  },
];

export function PricingSection() {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Choose the plan that's right for you and start filling forms with
            your voice today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl border ${
                tier.highlighted
                  ? "border-indigo-200 shadow-lg shadow-indigo-100"
                  : "border-slate-200 shadow-sm"
              } overflow-hidden transition-all hover:shadow-md`}
            >
              {tier.badge && (
                <div className="absolute top-0 right-0">
                  <div className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {tier.badge}
                  </div>
                </div>
              )}

              <div
                className={`p-6 ${tier.highlighted ? "bg-gradient-to-br from-indigo-50 to-sky-50" : ""}`}
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {tier.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-slate-900">
                    {tier.price}
                  </span>
                  <span className="text-slate-500 ml-1">/month</span>
                </div>
                <p className="text-slate-600 mb-6">{tier.description}</p>

                <Button
                  className={`w-full ${
                    tier.highlighted
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </div>

              <div className="border-t border-slate-100 p-6">
                <p className="font-medium text-sm text-slate-700 mb-4">
                  What's included:
                </p>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        className={`h-5 w-5 mr-2 flex-shrink-0 ${
                          tier.highlighted ? "text-indigo-500" : "text-sky-500"
                        }`}
                      />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
