import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  DollarSign, 
  Users, 
  Settings, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  X,
  Upload,
  Cigarette as Smoke,
  Dog,
  AlertCircle,
  ArrowLeft,
  Home
} from 'lucide-react';
import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';

const PostAd = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    currency: 'USD',
    capacity: 1,
    category: 'Oila uchun',
    allowSmoking: false,
    allowPets: false,
    additionalTerms: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const steps = [
    { id: 1, title: t('post_step_1'), icon: MapPin },
    { id: 2, title: t('post_step_2'), icon: DollarSign },
    { id: 3, title: t('post_step_3'), icon: Settings },
    { id: 4, title: t('post_step_4'), icon: FileText }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = (name) => {
    setFormData({ ...formData, [name]: !formData[name] });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const generatePDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const now = new Date();
    
    // Add Branding
    doc.setFontSize(22);
    doc.setTextColor(1, 50, 32); 
    doc.text('OsonUy - IJARAGA BERISH SHARTNOMASI', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Sana: ${now.toLocaleDateString()}`, 20, 30);
    doc.text(`ID: OU-${Math.floor(Math.random() * 1000000)}`, 20, 37);

    doc.line(20, 45, 190, 45);

    doc.setFontSize(14);
    doc.text('1. MULK TAVSIFI', 20, 55);
    doc.setFontSize(12);
    doc.text(`Manzil: ${formData.location || 'Toshkent shahar'}`, 25, 65);
    doc.text(`Maksimal yashovchilar soni: ${formData.capacity} kishi`, 25, 72);
    doc.text(`Maqsadli guruh: ${formData.category}`, 25, 79);

    doc.setFontSize(14);
    doc.text('2. TO\'LOV SHARTLARI', 20, 95);
    doc.setFontSize(12);
    doc.text(`Oylik ijara haqi: ${formData.price} ${formData.currency}`, 25, 105);

    doc.save('Ijara_Shartnomasi.pdf');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      generatePDF();
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24 font-sans relative overflow-hidden">
      <Navbar forceSolid={true} onNavigate={(path) => navigate(path)} />

      {/* Back Button */}
      <div className="absolute top-28 left-10 z-20">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all group px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm tracking-tight">{t('btn_back')}</span>
        </button>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Progress Sidebar */}
          <div className="w-full md:w-72 bg-[#013220]/20 border-r border-white/10 p-8">
            <h2 className="text-xl font-bold text-white mb-8">{t('post_title')}</h2>
            <div className="space-y-6">
              {steps.map((s) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isCompleted = step > s.id;
                return (
                  <div key={s.id} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'bg-[#013220] text-white shadow-[0_0_15px_rgba(1,50,32,0.5)]' : 
                      isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-500'}`}>Step {s.id}</p>
                      <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>{s.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-grow p-8 md:p-12 relative min-h-[500px]">
            {submitSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{t('post_success_title')}</h2>
                <p className="text-gray-400 max-w-sm mb-8">{t('post_success_desc')}</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] text-white px-10 py-4 rounded-xl font-black transition-all shadow-[0_10px_30px_rgba(3,92,58,0.3)] uppercase tracking-[0.2em] text-sm"
                >
                  {t('post_btn_home')}
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex-grow">
                  {/* Step 1: Location */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('post_map_title')}</h3>
                        <p className="text-gray-400 text-sm">{t('post_map_desc')}</p>
                      </div>
                      <div className="w-full h-80 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center group cursor-pointer hover:border-[#013220]/50 transition-all">
                        <MapPin className="w-12 h-12 text-gray-600 group-hover:text-[#013220] mb-4 transition-colors" />
                        <p className="text-gray-500 font-medium tracking-tight">Google Maps API</p>
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder={t('filter_location_placeholder')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:border-[#013220] outline-none transition-all"
                      />
                    </div>
                  )}

                  {/* Step 2: Pricing */}
                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('post_price_capacity')}</h3>
                        <p className="text-gray-400 text-sm">{t('post_price_desc')}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('post_label_rent')}</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              placeholder="500"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-bold text-white outline-none focus:border-[#013220] transition-all"
                            />
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                              {['USD', 'SUM'].map(c => (
                                <button
                                  key={c}
                                  onClick={() => setFormData({...formData, currency: c})}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${formData.currency === c ? 'bg-[#013220] text-white' : 'bg-white/5 text-gray-500'}`}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('post_label_capacity')}</label>
                          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 h-[74px]">
                            <button
                              onClick={() => setFormData({...formData, capacity: Math.max(1, formData.capacity - 1)})}
                              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white"
                            >
                              -
                            </button>
                            <div className="flex-grow flex items-center justify-center">
                              <span className="text-2xl font-bold text-white mx-4">{formData.capacity}</span>
                              <span className="text-gray-500 text-sm font-medium">{t('detail_capacity').toLowerCase()}</span>
                            </div>
                            <button
                              onClick={() => setFormData({...formData, capacity: formData.capacity + 1})}
                              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Rules */}
                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('post_rules_title')}</h3>
                        <p className="text-gray-400 text-sm">{t('post_rules_desc')}</p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('post_category')}</label>
                          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 h-16">
                            {[t('tag_students'), t('filter_employment_work'), t('tag_family')].map(cat => (
                              <button
                                key={cat}
                                onClick={() => setFormData({...formData, category: cat})}
                                className={`flex-1 rounded-xl text-[10px] font-bold transition-all ${formData.category === cat ? 'bg-[#013220] text-white' : 'text-gray-500 hover:text-white'}`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div 
                            onClick={() => handleToggle('allowSmoking')}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${formData.allowSmoking ? 'border-[#013220] bg-[#013220]/10' : 'border-white/5 bg-white/20'}`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-xl ${formData.allowSmoking ? 'bg-[#013220] text-white' : 'bg-white/5 text-gray-500'}`}>
                                <Smoke className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-white">{t('post_smoking')}</span>
                            </div>
                            <div className={`w-12 h-6 rounded-full relative transition-all ${formData.allowSmoking ? 'bg-green-500' : 'bg-gray-700'}`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.allowSmoking ? 'right-1' : 'left-1'}`}></div>
                            </div>
                          </div>

                          <div 
                            onClick={() => handleToggle('allowPets')}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${formData.allowPets ? 'border-[#013220] bg-[#013220]/10' : 'border-white/5 bg-white/20'}`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-xl ${formData.allowPets ? 'bg-[#013220] text-white' : 'bg-white/5 text-gray-500'}`}>
                                <Dog className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-white">{t('post_pets')}</span>
                            </div>
                            <div className={`w-12 h-6 rounded-full relative transition-all ${formData.allowPets ? 'bg-green-500' : 'bg-gray-700'}`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.allowPets ? 'right-1' : 'left-1'}`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Terms */}
                  {step === 4 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('post_terms_title')}</h3>
                        <p className="text-gray-400 text-sm">{t('post_terms_desc')}</p>
                      </div>

                      <div className="p-6 bg-[#013220]/20 border border-[#013220]/40 rounded-2xl flex items-start space-x-4">
                        <AlertCircle className="w-6 h-6 text-[#013220] shrink-0" />
                        <div>
                          <p className="text-white font-bold mb-1">{t('post_min_term')}</p>
                          <p className="text-gray-400 text-sm">{t('post_min_term_desc')}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('post_extra_terms')}</label>
                        <textarea
                          name="additionalTerms"
                          value={formData.additionalTerms}
                          onChange={handleInputChange}
                          rows="5"
                          placeholder={t('post_extra_placeholder')}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-[#013220] transition-all resize-none"
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                  <button
                    onClick={handleBack}
                    className={`flex items-center space-x-2 text-gray-500 hover:text-white font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>{t('btn_prev')}</span>
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-[#013220] hover:bg-[#02452c] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-[0_5px_20px_rgba(1,50,32,0.4)] relative overflow-hidden group min-w-[180px] justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{step === 4 ? t('btn_confirm') : t('btn_next')}</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAd;
