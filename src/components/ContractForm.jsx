import { useState } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Download, 
  Send,
  Loader2,
  Calendar,
  Briefcase,
  IdCard,
  User,
  CheckCircle2,
  AlertCircle,
  Home
} from 'lucide-react';

const ContractForm = ({ property, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: '',
    passport: '',
    duration: '6 oy',
    workplace: '',
    age: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateTenantPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const now = new Date();
    
    // Brand Header
    doc.setFillColor(1, 50, 32); // Forest Green
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('OsonUy', 20, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('ONLINE IJARA SHARTNOMASI', 20, 33);
    
    doc.setFontSize(9);
    doc.text(`ID: OU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 160, 20);
    doc.text(`SANA: ${now.toLocaleDateString()}`, 160, 28);

    // Section 1: Parties
    doc.setTextColor(1, 50, 32);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. TOMONLAR', 20, 60);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`IJARACHI: ${formData.fullname}`, 25, 70);
    doc.text(`PASPORT: ${formData.passport}`, 25, 80);
    doc.text(`YOSH: ${formData.age}`, 25, 90);
    doc.text(`ISH/O'QISH: ${formData.workplace}`, 25, 100);
    
    // Section 2: Property
    doc.setTextColor(1, 50, 32);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('2. IJARA OBYEKTI', 20, 120);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`MANZIL: ${property.location}`, 25, 130);
    doc.text(`OYLIK TO'LOV: ${property.price}`, 25, 140);
    doc.text(`MUDDAT: ${formData.duration}`, 25, 150);
    
    // Section 3: Terms
    doc.setTextColor(1, 50, 32);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('3. ASOSIY SHARTLAR', 20, 170);
    
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const terms = [
      '- Ijarachi mulkni butligini saqlashga kafolat beradi.',
      '- To\'lov har oy belgilangan muddatda amalga oshirilishi shart.',
      `- Chekish: ${property.rules.smoking ? 'Ruxsat berilgan' : 'Qat\'iyan taqiqlangan'}.`,
      `- Uy hayvonlari: ${property.rules.pets ? 'Ruxsat berilgan' : 'Taqiqlangan'}.`
    ];
    doc.text(terms, 25, 180);
    
    // Signatures
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 240, 90, 240);
    doc.text('Ijarachi Imzosi', 35, 248);
    
    doc.line(120, 240, 190, 240);
    doc.text('OsonUy Kelishuvi', 135, 248);
    
    doc.save(`OsonUy_Shartnoma_${formData.fullname.replace(/\s/g, '_')}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCaptchaChecked || !isAgreed) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        generateTenantPDF();
      } catch (err) {
        console.error('PDF Generation failed:', err);
      }
      setIsSubmitting(false);
      setIsCompleted(true);
      
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 1500);
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
        <div className="bg-[var(--color-base-dark)] border border-[var(--color-primary-accent)] rounded-[3rem] p-12 max-w-sm w-full text-center shadow-[0_0_100px_rgba(3,92,58,0.3)] animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-[var(--color-primary-accent)]/20 rounded-full flex items-center justify-center text-[var(--color-primary-accent)] mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Muvaffaqiyatli!</h2>
          <p className="text-gray-400 font-medium leading-relaxed mb-6">
            Shartnoma rasmiylashtirildi va tizimga yuborildi. PDF nusxasi yuklab olinmoqda...
          </p>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[var(--color-primary-accent)] h-full animate-progress-fast"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-[var(--color-base-dark)] border border-white/5 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-500 my-auto">
        {/* Modal Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[var(--color-primary-accent)] rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Shartnoma Rasmiylashtirish</h2>
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">{property.location}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center ml-1">
                <User className="w-3 h-3 mr-2 text-[var(--color-primary-accent)]" /> 
                Ism va Familiya
              </label>
              <input 
                required
                type="text" 
                name="fullname"
                placeholder="E.g. Islombek Qosimov"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[var(--color-primary-accent)] transition-all font-medium"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center ml-1">
                <IdCard className="w-3 h-3 mr-2 text-[var(--color-primary-accent)]" /> 
                Pasport Seriya va Raqami
              </label>
              <input 
                required
                type="text" 
                name="passport"
                placeholder="AA 1234567"
                value={formData.passport}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[var(--color-primary-accent)] transition-all font-medium"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center ml-1">
                <Calendar className="w-3 h-3 mr-2 text-[var(--color-primary-accent)]" /> 
                Muddat
              </label>
              <select 
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-primary-accent)] transition-all appearance-none font-medium"
              >
                <option>3 oy</option>
                <option>6 oy</option>
                <option>1 yil</option>
                <option>Uzoq muddat</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center ml-1">
                <Briefcase className="w-3 h-3 mr-2 text-[var(--color-primary-accent)]" /> 
                Ish/O'qish joyi
              </label>
              <input 
                required
                type="text" 
                name="workplace"
                placeholder="E.g. Toshkent Davlat Universiteti"
                value={formData.workplace}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[var(--color-primary-accent)] transition-all font-medium"
              />
            </div>
          </div>

          {/* Terms & Captcha Section */}
          <div className="space-y-6 pt-4">
            <label className="flex items-center space-x-4 cursor-pointer group">
              <input 
                type="checkbox" 
                required
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="hidden" 
              />
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isAgreed ? 'bg-[var(--color-primary-accent)] border-[var(--color-primary-accent)]' : 'border-white/20'}`}>
                {isAgreed && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                Shartnoma shartlariga roziman
              </span>
            </label>

            {/* Custom reCAPTCHA style */}
            <div 
              onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
              className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-all ${isCaptchaChecked ? 'bg-green-500 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'border-gray-700 bg-gray-900 group-hover:border-gray-500'}`}>
                  {isCaptchaChecked && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                <span className="text-sm font-black text-gray-300 uppercase tracking-tighter">Men robot emasman</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="w-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all" />
                <span className="text-[8px] text-gray-600 mt-1 uppercase font-black">reCAPTCHA v2</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-8 border-t border-white/5">
            <button 
              disabled={isSubmitting || !isCaptchaChecked || !isAgreed}
              type="submit"
              className="w-full py-5 rounded-2xl text-lg font-black text-white bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] disabled:bg-white/5 disabled:text-gray-600 shadow-2xl transform hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center space-x-3 uppercase tracking-[0.2em]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>YUBORILMOQDA...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>SHARTNOMANI TASDIQLASH</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center space-x-2 mt-6">
              <AlertCircle className="w-4 h-4 text-gray-600" />
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">
                Xavfsizlik platforma tomonidan kafolatlanadi
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;
