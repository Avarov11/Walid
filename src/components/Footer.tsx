import { Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'Behance' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-light tracking-widest mb-4">
              LUXE INTERIORS
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Transforming spaces into timeless masterpieces. From core & shell to fully designed luxury living.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-light tracking-wider mb-4 text-amber-400">
              CONTACT
            </h4>
            <div className="space-y-2 text-gray-400 font-light">
              <p>info@luxeinteriors.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Dubai, UAE</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-light tracking-wider mb-4 text-amber-400">
              FOLLOW US
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 font-light text-sm">
            © 2025 Luxe Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
