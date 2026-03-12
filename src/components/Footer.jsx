import { Phone, MessageCircle, Instagram, Home } from 'lucide-react';

const urgentProperties = [
  {
    id: 101,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
    price: '$250',
    oldPrice: '$400',
    location: 'Chilonzor, Tashkent',
  },
  {
    id: 102,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
    price: '$300',
    oldPrice: '$550',
    location: 'Yunusobod, Tashkent',
  },
  {
    id: 103,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?auto=format&fit=crop&q=80',
    price: '$400',
    oldPrice: '$700',
    location: 'Mirzo Ulugbek, Tashkent',
  },
  {
    id: 104,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
    price: '$280',
    oldPrice: '$350',
    location: 'Yashnobod, Tashkent',
  }
];

const Footer = () => {
  return (
    <footer className="bg-[var(--color-base-black)] pt-16 border-t border-[var(--color-forest-900)]">
      
      {/* SROCHNA UYLAR Section (Horizontal Scroll on Mobile, Grid on Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center mb-8">
          <div className="w-2 h-8 bg-red-600 mr-4 rounded-full"></div>
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
            Srochna Uylar
          </h3>
        </div>

        {/* Horizontal scroll container for mobile, flex wrap or grid for larger screens */}
        <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-6 snap-x md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {urgentProperties.map((prop) => (
            <div
              key={prop.id}
              className="group flex flex-col sm:flex-row items-center bg-[var(--color-base-dark)] rounded-xl overflow-hidden border border-[var(--color-forest-900)] hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_20px_rgba(3,92,58,0.4)] transition-all duration-300 cursor-pointer min-w-[260px] sm:min-w-[320px] snap-center shrink-0"
            >
              {/* Thumbnail */}
              <div className="relative h-36 sm:h-28 w-full sm:w-28 flex-shrink-0">
                <img
                  src={prop.image}
                  alt={prop.location}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Glowing "URGENT" Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse tracking-wide">
                    URGENT
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col justify-center w-full">
                <p className="text-gray-400 text-xs sm:text-sm truncate mb-2" title={prop.location}>
                  {prop.location}
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold text-white tracking-tight">{prop.price}</span>
                  <span className="text-sm text-gray-500 line-through">{prop.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[var(--color-base-black)] border-t border-[var(--color-forest-900)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Logo & About Column (Takes up 4 cols on md) */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center space-x-2 group cursor-pointer mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-accent)] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col items-start leading-none -space-y-0.5">
                  <span className="text-2xl font-black tracking-tighter">
                    <span className="text-[var(--color-primary-accent)]">Oson</span>
                    <span className="text-white">Uy</span>
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">
                    Platform
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                O'zbekistondagi eng tezkor va ishonchli kvartira qidirish platformasi.
              </p>
            </div>

            {/* Quick Links Column (Takes up 4 cols on md) */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 text-sm hover:text-[var(--color-primary-accent)] transition-colors duration-200">Home</a></li>
                <li><a href="#" className="text-gray-400 text-sm hover:text-[var(--color-primary-accent)] transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-gray-400 text-sm hover:text-[var(--color-primary-accent)] transition-colors duration-200">Services</a></li>
                <li><a href="#" className="text-gray-400 text-sm hover:text-[var(--color-primary-accent)] transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact & Social Column (Takes up 4 cols on md) */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Biz bilan bog'lanish</h4>
              
              {/* Phone */}
              <div className="flex items-center text-gray-400 mb-6 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[var(--color-base-dark)] border border-[var(--color-forest-900)] flex items-center justify-center mr-4 group-hover:border-[var(--color-primary-accent)] group-hover:shadow-[0_0_15px_rgba(3,92,58,0.4)] transition-all">
                  <Phone className="w-4 h-4 text-gray-300 group-hover:text-[var(--color-primary-accent)] transition-colors" />
                </div>
                <span className="text-lg font-medium tracking-wide group-hover:text-white transition-colors">+770778258</span>
              </div>

              {/* Socials */}
              <div className="flex space-x-4">
                <a 
                  href="https://t.me/Qosimov111" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-[var(--color-base-dark)] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_20px_rgba(3,92,58,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Telegram"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/qossimov_8258" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-[var(--color-base-dark)] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_20px_rgba(3,92,58,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-xs text-gray-600 font-medium tracking-wide">
              &copy; 2026 OsonUy. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
