
import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon } from './icons';

const Header: React.FC = () => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const languages = ['English', 'Arabic', 'French', 'Latin'];
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-2xl font-bold text-brand-text">
              APK<span className="text-brand-primary">Hub</span>
            </a>
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for apps & games..."
                className="w-full bg-brand-bg border border-gray-600 rounded-full py-2.5 pl-6 pr-12 text-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-brand-text-secondary">
              <a href="#" className="hover:text-brand-text transition-colors">Games</a>
              <a href="#" className="hover:text-brand-text transition-colors">Apps</a>
              <a href="#" className="hover:text-brand-text transition-colors">Blog</a>
            </nav>
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-brand-text-secondary hover:text-brand-text transition-colors"
              >
                <span>{selectedLang}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {langMenuOpen && (
                <ul className="absolute right-0 mt-2 w-32 bg-brand-surface rounded-md shadow-lg py-1 z-10 border border-gray-700">
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangMenuOpen(false);
                      }}
                      className="cursor-pointer px-4 py-2 text-sm text-brand-text-secondary hover:bg-brand-bg hover:text-brand-text"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
