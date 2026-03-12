import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Cigarette as Smoke, 
  Dog, 
  Phone, 
  MessageSquare,
  AlertTriangle,
  FileCheck,
  Settings
} from 'lucide-react';
import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';
import { properties } from '../data/mockData';
import ContractForm from './ContractForm';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showContract, setShowContract] = useState(false);

  const property = useMemo(() => {
    return properties.find(p => p.id === parseInt(id));
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-black mb-4">E'lon topilmadi</h1>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-[var(--color-primary-accent)] rounded-lg font-bold">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Navbar forceSolid={true} onNavigate={(path) => navigate(path)} />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm tracking-tight">{t('btn_back')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-10">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] shadow-2xl group border border-white/5">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-6 left-6">
                <span className="px-6 py-2 bg-[var(--color-primary-accent)] text-white text-[10px] font-black uppercase rounded-xl shadow-2xl backdrop-blur-md">
                   {property.numericPrice < 300 ? t('tag_cheap') : t('tag_urgent')}
                </span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 border-b border-white/5 pb-10">
                <div>
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">{property.title || property.location}</h1>
                  <div className="flex items-center text-gray-500 uppercase tracking-widest text-sm font-bold">
                    <MapPin className="w-4 h-4 mr-2 text-[var(--color-primary-accent)]" />
                    <span>{property.city}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-5xl font-black text-white tracking-tighter">{property.price}</div>
                  <div className="text-xs font-black text-gray-500 mt-2 uppercase tracking-[0.2em]">/{t('detail_month')}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/5 rounded-3xl p-8 border border-white/5 text-center flex flex-col items-center justify-center group hover:border-[var(--color-primary-accent)]/30 transition-all">
                  <Users className="w-8 h-8 text-[var(--color-primary-accent)] mb-4" />
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{t('detail_capacity')}</p>
                  <p className="text-xl font-black text-white">{property.capacity} kishi</p>
                </div>
                <div className="bg-white/5 rounded-3xl p-8 border border-white/5 text-center flex flex-col items-center justify-center group hover:border-[var(--color-primary-accent)]/30 transition-all">
                   <MapPin className="w-8 h-8 text-[var(--color-primary-accent)] mb-4" />
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{t('detail_city')}</p>
                   <p className="text-xl font-black text-white truncate w-full">{property.city}</p>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-2xl font-black text-white flex items-center tracking-tight">
                   <span className="w-2 h-8 bg-[var(--color-primary-accent)] rounded-full mr-4 shadow-lg"></span>
                   {t('detail_about')}
                </h2>
                <p className="text-gray-400 leading-relaxed text-lg font-medium">
                  {property.description || "Ushbu xonadon barcha qulayliklarga ega. Shahar markazida joylashgan, transport qulayliklariga ega bo'lgan shinam uy. To'lov o'z vaqtida amalga oshirilishi shart."}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                <Settings className="w-24 h-24 text-white" />
              </div>
              <h2 className="text-xl font-black text-white mb-10 border-b border-white/5 pb-5 uppercase tracking-widest">{t('detail_rules')}</h2>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-white/5 rounded-2xl text-[var(--color-primary-accent)] border border-white/5">
                      <Smoke className="w-6 h-6" />
                    </div>
                    <span className="font-black text-gray-400 uppercase tracking-widest text-xs">{t('post_smoking')}</span>
                  </div>
                  <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl tracking-tighter uppercase ${property.rules?.smoking ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {property.rules?.smoking ? "RUXSAT" : "TAQIQLANGAN"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-white/5 rounded-2xl text-[var(--color-primary-accent)] border border-white/5">
                      <Dog className="w-6 h-6" />
                    </div>
                    <span className="font-black text-gray-400 uppercase tracking-widest text-xs">{t('post_pets')}</span>
                  </div>
                  <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl tracking-tighter uppercase ${property.rules?.pets ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {property.rules?.pets ? "RUXSAT" : "TAQIQLANGAN"}
                  </span>
                </div>
                
                <div className="pt-8 border-t border-white/5">
                  <div className="bg-[#013220]/20 rounded-3xl p-6 border border-[#013220]/40">
                    <p className="text-[10px] font-black text-[#013220] uppercase tracking-[0.2em] mb-3">{t('detail_only')}</p>
                    <p className="text-xl font-black text-white tracking-tight">{property.category || "Oila"}</p>
                    <p className="text-[10px] text-gray-500 font-bold mt-3 leading-relaxed">{t('detail_category_disclaimer')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-primary-accent)] rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(3,92,58,0.3)] relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative z-10">
                 <div className="flex items-center space-x-4 mb-8">
                    <FileCheck className="w-8 h-8 text-white" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Ijara shartnomasi</span>
                 </div>
                 
                 <div className="mb-10">
                   <p className="text-sm font-bold text-white/90 mb-8 leading-relaxed">
                     Ushbu mulk uchun rasmiy ijara shartnomasini onlayn tarzda rasmiylashtiring va PDF formatida yuklab oling.
                   </p>
                   <button 
                     onClick={() => setShowContract(true)}
                     className="w-full bg-white text-[var(--color-primary-accent)] font-black py-5.5 rounded-[1.5rem] shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-[0.2em] text-sm"
                   >
                     ROZIMAN
                   </button>
                 </div>

                 <div className="flex items-start space-x-4 p-5 bg-black/20 rounded-[1.5rem] border border-white/5">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0" />
                    <p className="text-[10px] font-bold text-white/60 leading-relaxed italic">
                      Platforma faqatgina shartnoma generatsiyasi uchun xizmat qiladi. To'lovlar bevosita egasiga amalga oshiriladi.
                    </p>
                 </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-[var(--color-primary-accent)] transition-all">
               <div className="flex items-center space-x-6">
                 <div className="w-16 h-16 rounded-[1.2rem] bg-[var(--color-primary-accent)]/20 flex items-center justify-center text-[var(--color-primary-accent)] border border-[var(--color-primary-accent)]/20 group-hover:scale-110 transition-transform">
                   <Phone className="w-7 h-7" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mulk egasi</p>
                   <p className="text-xl font-black text-white tracking-tighter">{property.landlordPhone || "+998 90 123 45 67"}</p>
                 </div>
               </div>
               <button className="p-4 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                 <MessageSquare className="w-6 h-6" />
               </button>
            </div>
          </div>
        </div>
      </div>

      {showContract && (
        <ContractForm 
          property={property} 
          onClose={() => setShowContract(false)} 
          onSuccess={() => {
            setShowContract(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
};

export default PropertyDetail;
