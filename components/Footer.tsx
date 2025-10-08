
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-brand-text mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-brand-text-secondary">
              <li><a href="#" className="hover:text-brand-primary">Home</a></li>
              <li><a href="#" className="hover:text-brand-primary">Games</a></li>
              <li><a href="#" className="hover:text-brand-primary">Apps</a></li>
              <li><a href="#" className="hover:text-brand-primary">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-brand-text mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-brand-text-secondary">
              <li><a href="#" className="hover:text-brand-primary">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-primary">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-brand-text mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-brand-text-secondary">
              <li><a href="#" className="hover:text-brand-primary">DMCA</a></li>
              <li><a href="#" className="hover:text-brand-primary">Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-brand-text mb-4">Follow Us</h3>
            {/* Placeholder for social icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-brand-text-secondary hover:text-brand-primary">FB</a>
              <a href="#" className="text-brand-text-secondary hover:text-brand-primary">TW</a>
              <a href="#" className="text-brand-text-secondary hover:text-brand-primary">IG</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-brand-text-secondary">
          <p>&copy; {new Date().getFullYear()} APKHub. All rights reserved.</p>
          <p className="mt-2">Disclaimer: All apps are property of their respective developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
