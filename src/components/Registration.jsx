import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ShieldCheck, Apple, ChevronRight, ArrowLeft, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Registration = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isWelcome, setIsWelcome] = useState(false);
  const [registeredName, setRegisteredName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Erkak',
    email: '',
    isRobotConfirmed: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.age) newErrors.age = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.isRobotConfirmed) newErrors.robot = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setRegisteredName(formData.name);
      setIsWelcome(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  if (isWelcome) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center animate-in fade-in zoom-in duration-1000">
          <div className="w-24 h-24 bg-[var(--color-primary-accent)]/20 rounded-full flex items-center justify-center text-[var(--color-primary-accent)] mx-auto mb-8 shadow-[0_0_50px_rgba(3,92,58,0.3)] animate-pulse">
            <User className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            {t('reg_welcome_msg')}, <span className="text-[var(--color-primary-accent)]">{registeredName}</span>!
          </h1>
          <p className="text-gray-400 text-lg">{t('reg_success_msg')}</p>
        </div>
      </div>
    );
  }

  const genderOptions = [
    { id: 'Erkak', label: t('reg_gender_m') },
    { id: 'Ayol', label: t('reg_gender_f') }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black font-sans">
      {/* Background with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      <div className="absolute inset-0 z-1 px-4 bg-gradient-to-br from-black via-black/80 to-[#013220]/40"></div>

      {/* Back Button */}
      <div className="absolute top-10 left-10 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all group px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm tracking-tight">{t('btn_back')}</span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl relative group overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-primary-accent)] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="flex flex-col items-center mb-10">
            <div className="flex flex-col items-center mb-6">
               <div className="w-16 h-16 bg-[var(--color-primary-accent)] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl mb-4">
                 <Home className="w-8 h-8" />
               </div>
               <div className="flex items-baseline space-x-1">
                 <span className="text-3xl font-black text-[var(--color-primary-accent)] tracking-tighter uppercase">Oson</span>
                 <span className="text-3xl font-black text-white tracking-tighter uppercase">Uy</span>
               </div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">{t('reg_title')}</h1>
            <p className="text-gray-500 text-xs font-bold mt-2 uppercase tracking-widest">{t('reg_welcome_back')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 ml-1 uppercase tracking-[0.2em]">{t('reg_name')}</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className={`w-4 h-4 ${errors.name ? 'text-red-500' : 'text-gray-600'}`} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder={t('reg_name_placeholder')}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border-2 transition-all rounded-[1.2rem] py-4 pl-12 pr-6 text-white text-sm font-medium
                    ${errors.name ? 'border-red-500/30 focus:border-red-500' : 'border-white/5 focus:border-[var(--color-primary-accent)]'}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 ml-1 uppercase tracking-[0.2em]">{t('reg_age')}</label>
                <input
                  type="number"
                  name="age"
                  placeholder="20"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border-2 transition-all rounded-[1.2rem] py-4 px-6 text-white text-sm font-medium
                    ${errors.age ? 'border-red-500/30 focus:border-red-500' : 'border-white/5 focus:border-[var(--color-primary-accent)]'}`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 ml-1 uppercase tracking-[0.2em]">{t('reg_gender')}</label>
                <div className="flex bg-white/5 border-2 border-white/5 rounded-[1.2rem] p-1.5 h-[58px]">
                  {genderOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleGenderChange(opt.id)}
                      className={`flex-1 rounded-[0.8rem] text-xs font-black uppercase tracking-tighter transition-all ${
                        formData.gender === opt.id ? 'bg-[var(--color-primary-accent)] text-white shadow-xl' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 ml-1 uppercase tracking-[0.2em]">Email</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className={`w-4 h-4 ${errors.email ? 'text-red-500' : 'text-gray-600'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border-2 transition-all rounded-[1.2rem] py-4 pl-12 pr-6 text-white text-sm font-medium
                    ${errors.email ? 'border-red-500/30 focus:border-red-500' : 'border-white/5 focus:border-[var(--color-primary-accent)]'}`}
                />
              </div>
            </div>

            <div className="py-2">
              <div 
                className={`flex items-center justify-between bg-white/5 border-2 border-white/5 rounded-[1.2rem] p-5 cursor-pointer transition-all hover:bg-white/10 ${errors.robot ? 'border-red-500/30' : ''}`}
                onClick={() => setFormData({ ...formData, isRobotConfirmed: !formData.isRobotConfirmed })}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all ${formData.isRobotConfirmed ? 'bg-[var(--color-primary-accent)] border-[var(--color-primary-accent)]' : 'border-gray-700 bg-black/40'}`}>
                    {formData.isRobotConfirmed && <ShieldCheck className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-xs font-black text-gray-300 uppercase tracking-tighter">{t('reg_not_robot')}</span>
                </div>
                <div className="flex items-center">
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="w-6 opacity-40 grayscale" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] text-white font-black py-5 rounded-[1.2rem] transition-all shadow-[0_10px_30px_rgba(3,92,58,0.3)] group mt-4 uppercase tracking-[0.2em] text-sm"
            >
              <div className="flex items-center justify-center">
                <span>{t('reg_title')}</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <div className="flex items-center py-4">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="mx-6 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em]">{t('reg_or')}</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <button
              type="button"
              className="w-full bg-white/5 border border-white/5 hover:bg-white/10 text-white font-black py-4.5 rounded-[1.2rem] transition-all flex items-center justify-center space-x-3 group"
            >
              <Apple className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs uppercase tracking-widest leading-none">Continue with iCloud</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
