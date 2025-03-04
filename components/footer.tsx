import { Mic } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-1.5 rounded-lg">
                <Mic className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">
                VoiceForm
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              Transform any online form into a voice-responsive experience. Save
              time and make form-filling accessible to everyone.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Integrations", "FAQ", "Roadmap"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-indigo-600 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact", "Partners"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-indigo-600 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Data Processing",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {currentYear} VoiceForm. All rights reserved.
          </p>

          <div className="flex space-x-6">
            {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-slate-500 hover:text-indigo-600 text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
