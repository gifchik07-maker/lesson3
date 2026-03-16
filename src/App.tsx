import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Instagram, Mail, Phone, ArrowRight, Camera, Sparkles, Heart, MapPin, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import photo1 from './assets/photo_2026-03-12_17-38-02.jpg';
import photo2 from './assets/photo_2026-03-12_17-38-05.jpg';
import photo3 from './assets/photo_2026-03-12_17-38-08.jpg';
import photo4 from './assets/photo4.jpg';
import photo5 from './assets/photo5.jpg';
import photo6 from './assets/photo6.jpg';
import photo7 from './assets/photo7.jpg';
import aboutPhoto from './assets/about_photo.jpg';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-accent/30 rounded-full pointer-events-none z-[10000]"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(180, 160, 137, 0.8)' : 'rgba(180, 160, 137, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.6 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[10000]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 800, mass: 0.1 }}
      />
    </div>
  );
};

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Портретна'
  });

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  // Mock booked dates (in a real app, fetch these from a database)
  const bookedDates = [15, 20, 22, 28]; 
  
  const isDateDisabled = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Disable if it's in the past or in the bookedDates list (only for current month/year for simplicity)
    const isPast = dateToCheck < today;
    const isBooked = currentMonth.getMonth() === new Date().getMonth() && 
                    currentMonth.getFullYear() === new Date().getFullYear() && 
                    bookedDates.includes(day);
    
    return isPast || isBooked;
  };

  const days = Array.from({ length: daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }, (_, i) => i);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 bg-ink/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-base w-full max-w-4xl overflow-hidden rounded-[40px] shadow-2xl flex flex-col md:flex-row relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-accent/10 rounded-full hover:bg-accent hover:text-white transition-all z-10"
            >
              <X size={20} />
            </button>

            {/* Left Side: Visual / Calendar */}
            <div className="md:w-1/2 bg-surface p-8 md:p-12 flex flex-col justify-center">
              {step < 3 ? (
                <>
                  <div className="mb-8 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-black">Крок {step} з 2</span>
                    <h3 className="text-4xl font-display italic leading-none">
                      {step === 1 ? "Оберіть дату" : "Ваші контакти"}
                    </h3>
                  </div>

                  {step === 1 ? (
                    <div className="space-y-6">
                      <div className="bg-base/50 p-6 rounded-3xl border border-accent/20">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-bold text-sm uppercase tracking-widest">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                          <div className="flex gap-2">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-accent/10 rounded-full transition-colors"><ChevronLeft size={16} /></button>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-accent/10 rounded-full transition-colors"><ChevronRight size={16} /></button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold opacity-30 mb-4 tracking-tighter uppercase">
                          {['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(d => <div key={d}>{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {emptyDays.map(i => <div key={`empty-${i}`} />)}
                          {days.map(day => {
                            const disabled = isDateDisabled(day);
                            const isBooked = bookedDates.includes(day) && currentMonth.getMonth() === new Date().getMonth();
                            return (
                              <button
                                key={day}
                                disabled={disabled}
                                onClick={() => setSelectedDate(day)}
                                className={`aspect-square flex items-center justify-center rounded-xl text-xs transition-all relative ${
                                  selectedDate === day 
                                    ? 'bg-accent text-white font-bold scale-110 shadow-lg' 
                                    : disabled 
                                      ? 'opacity-20 cursor-not-allowed bg-ink/5' 
                                      : 'hover:bg-accent/20'
                                }`}
                              >
                                {day}
                                {isBooked && (
                                  <div className="absolute bottom-1 w-1 h-1 bg-ink rounded-full" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex gap-6 justify-center text-[9px] uppercase tracking-widest font-bold opacity-60">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span>Обрано</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-ink/20" />
                          <span>Зайнято</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 bg-accent/10 rounded-2xl flex items-center gap-4">
                        <CalendarIcon size={20} className="text-accent" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Обрана дата</p>
                          <p className="font-bold">{selectedDate} {monthNames[currentMonth.getMonth()].toLowerCase()}, {currentMonth.getFullYear()}</p>
                        </div>
                      </div>
                      <p className="text-sm italic opacity-70">Залиште ваші дані, і я зв'яжуся з вами для обговорення деталей зйомки.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center space-y-6 flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="text-4xl font-display italic">Дякую!</h3>
                  <p className="text-sm italic opacity-70">Вашу заявку прийнято. Я зв'яжуся з вами найближчим часом.</p>
                </div>
              )}
            </div>

            {/* Right Side: Form */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-ink/5">
              {step === 1 ? (
                <div className="space-y-8">
                  <p className="text-sm italic opacity-70">Першим кроком ми обираємо бажаний день. Не хвилюйтеся, точний час ми узгодимо пізніше.</p>
                  <button
                    disabled={!selectedDate}
                    onClick={() => setStep(2)}
                    className="w-full py-5 bg-ink text-white rounded-full text-[11px] uppercase tracking-[0.4em] font-black hover:bg-accent transition-all duration-500 disabled:opacity-30 disabled:hover:bg-ink"
                  >
                    Наступний крок
                  </button>
                </div>
              ) : step === 2 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-black opacity-50 ml-4">Як вас звати?</label>
                    <input
                      required
                      type="text"
                      placeholder="ПІБ"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-surface border-none rounded-3xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-black opacity-50 ml-4">Номер телефону</label>
                    <input
                      required
                      type="tel"
                      placeholder="+380"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-surface border-none rounded-3xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-black opacity-50 ml-4">Тип зйомки</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-surface border-none rounded-3xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none text-sm font-medium transition-all appearance-none cursor-pointer"
                    >
                      <option>Портретна</option>
                      <option>Love Story</option>
                      <option>Репортажна</option>
                      <option>Творча</option>
                    </select>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-5 border border-ink/10 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-surface transition-all"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] py-5 bg-accent text-white rounded-full text-[11px] uppercase tracking-[0.4em] font-black hover:bg-ink transition-all duration-500 shadow-xl"
                    >
                      Підтвердити
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <button
                    onClick={onClose}
                    className="w-full py-5 bg-ink text-white rounded-full text-[11px] uppercase tracking-[0.4em] font-black hover:bg-accent transition-all duration-500"
                  >
                    Повернутися на сайт
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenBooking }: { onOpenBooking: () => void }) => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-5 md:py-10 flex justify-between items-center bg-base/80 backdrop-blur-lg border-b border-ink/5">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-xl md:text-2xl font-logo tracking-widest text-ink font-bold uppercase"
    >
      Tetiana Klochko
    </motion.div>
    <div className="hidden md:flex gap-12 lg:gap-20 text-[11px] uppercase tracking-[0.4em] font-semibold text-ink/60">
      <a href="#portfolio" className="hover:text-accent transition-colors duration-500">Портфоліо</a>
      <a href="#about" className="hover:text-accent transition-colors duration-500">Про мене</a>
      <a href="#contact" className="hover:text-accent transition-colors duration-500">Контакти</a>
    </div>
    <motion.button 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: [1, 1.05, 1],
      }}
      transition={{
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.5 }
      }}
      onClick={onOpenBooking}
      className="group flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-accent text-base rounded-full text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-black hover:bg-ink transition-all duration-500 shadow-[0_20px_50px_rgba(229,169,169,0.4)] hover:shadow-none"
    >
      <span>Замовити</span>
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
    </motion.button>
  </nav>
);

const Portfolio = () => {
  const categories = ["Все", "Любов", "Портрети", "Моменти"];
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    { id: 1, category: "Портрети", title: "Мистецтво світла", image: photo4 },
    { id: 2, category: "Портрети", title: "Елегантність", image: photo5 },
    { id: 3, category: "Моменти", title: "За кадром", image: photo6 },
    { id: 4, category: "Портрети", title: "Сяйво", image: photo7 },
    { id: 5, category: "Любов", title: "Ніжність", image: photo1 },
    { id: 6, category: "Портрети", title: "Глибина", image: photo2 },
  ];

  const filteredProjects = activeCategory === "Все" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 md:py-56">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">Галерея</span>
            <h2 className="text-5xl md:text-7xl font-display italic">Вибрані роботи</h2>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-ink/40">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`hover:text-accent transition-colors relative ${activeCategory === cat ? 'text-accent' : ''}`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="underline" className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(project.image)}
              className="group relative aspect-square overflow-hidden bg-surface rounded-2xl cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover object-[center_top] transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 text-base">
                <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-2">{project.category}</span>
                <h3 className="text-2xl font-display italic">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
          >
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="max-w-full max-h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
            <button 
              className="absolute top-4 right-4 text-base p-4 bg-accent/20 rounded-full hover:bg-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              Закрити
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

const Hero = ({ onOpenBooking }: { onOpenBooking: () => void }) => (
  <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 md:pt-32 px-6 md:px-16 bg-base overflow-hidden">
    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[100px] rounded-full" />
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
      <div className="lg:col-span-7 z-10 text-center lg:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 md:space-y-12"
        >
          <div className="flex items-center justify-center lg:justify-start gap-4 opacity-40">
            <div className="w-12 h-px bg-accent"></div>
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-semibold">Lifestyle & Portrait</span>
          </div>
          <h1 className="text-[18vw] lg:text-[10vw] leading-[0.8] font-display text-ink font-bold italic tracking-tighter">
            Мистецтво <br/>
            <span className="lg:pl-[15%] text-accent">щирості.</span>
          </h1>
          <p className="max-w-lg mx-auto lg:mx-0 text-base md:text-lg font-light leading-relaxed text-ink/70 italic lg:pl-6 lg:border-l-2 lg:border-accent/20">
            Я вірю, що краса ховається в деталях — у випадковому погляді, легкому дотику та щирій посмішці. Створюю спогади, які стають сімейними реліквіями.
          </p>
          <div className="pt-8 flex justify-center lg:justify-start">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenBooking}
              className="px-12 py-6 bg-ink text-base rounded-full text-[12px] uppercase tracking-[0.5em] font-bold hover:bg-accent transition-all duration-500 shadow-2xl"
            >
              Забронювати дату
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-5 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="relative aspect-[4/5] md:aspect-[3/4] oval-mask overflow-hidden expensive-shadow"
        >
          <img 
            src={photo3} 
            alt="Atmospheric Portrait" 
            className="w-full h-full object-cover object-[center_top]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute -bottom-12 -left-12 hidden xl:block">
          <div className="w-48 h-48 rounded-full border border-accent/20 flex items-center justify-center text-[11px] uppercase tracking-[0.5em] text-accent/40 vertical-text font-bold">
            Tetiana Klochko — 2026
          </div>
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-px h-20 bg-ink"
      />
    </div>
  </section>
);

const AboutAndContact = () => (
  <section id="about" className="py-24 md:py-48 px-6 md:px-16 bg-base relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center mb-32 md:mb-56">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="space-y-12 md:space-y-20">
            <div className="space-y-6">
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-accent font-bold">Ваш фотограф</span>
              <h2 className="text-5xl md:text-7xl font-logo text-ink font-extrabold tracking-tight uppercase">Тетяна <br/> Клочко</h2>
            </div>
            <div className="space-y-10 text-base md:text-xl font-normal leading-relaxed text-ink italic tracking-wide">
              <p>
                Більше 3 років я спеціалізуюся на створенні щирих та виразних портретів. Моя філософія — це відмова від штучного позування на користь справжніх емоцій та життя у кадрі.
              </p>
              <p>
                Я створюю атмосферу довіри та абсолютного комфорту, де ви можете розкритися та просто бути собою. Моє авторське бачення та увага до деталей гарантують результат, який перевершить ваші найвищі очікування.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-accent/20">
              <div className="space-y-3">
                <Camera size={24} className="text-accent" />
                <div className="text-[11px] uppercase tracking-widest font-bold">10 Фото</div>
                <div className="text-[10px] uppercase tracking-widest opacity-100 text-ink font-bold italic">Наступного дня</div>
              </div>
              <div className="space-y-3">
                <Sparkles size={24} className="text-accent" />
                <div className="text-[11px] uppercase tracking-widest font-bold">Преміум</div>
                <div className="text-[10px] uppercase tracking-widest opacity-100 text-ink font-bold italic">Якість та сервіс</div>
              </div>
              <div className="space-y-3">
                <ShieldCheck size={24} className="text-accent" />
                <div className="text-[11px] uppercase tracking-widest font-bold">Офіційно</div>
                <div className="text-[10px] uppercase tracking-widest opacity-100 text-ink font-bold italic">Працюємо через ФОП</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative aspect-[4/5] md:aspect-[16/10] oval-mask overflow-hidden expensive-shadow border-8 border-surface"
          >
            <img 
              src={aboutPhoto} 
              alt="Tetiana Klochko" 
              className="w-full h-full object-cover object-[center_top]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-32 md:py-56 border-y border-accent/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center space-y-4 mb-24">
            <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">Відгуки</span>
            <h2 className="text-4xl md:text-6xl font-display italic">Щирі слова</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 md:gap-24">
            {[
              {
                text: "Кожна зйомка з Тетяною — це не просто фото, це терапія щирістю. Вона бачить те, що ми часто ховаємо від самих себе.",
                author: "Олена"
              },
              {
                text: "Неймовірне відчуття легкості. Я ніколи не думала, що можу виглядати так природно на камеру. Дякую за ці спогади.",
                author: "Марія"
              },
              {
                text: "Тетяна має дар ловити моменти, які тривають секунду, але залишаються в серці назавжди. Справжнє мистецтво.",
                author: "Анна"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="space-y-8 text-center"
              >
                <div className="text-accent/30 text-6xl font-display leading-none">“</div>
                <p className="text-lg md:text-xl font-display italic leading-relaxed text-ink">
                  {item.text}
                </p>
                <div className="pt-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink/80">— {item.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.6em] text-ink/30 font-bold">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent"
          />
        </motion.div>
      </section>

      <div id="contact" className="text-center space-y-24 md:space-y-40 bg-surface/30 py-32 rounded-[60px] mx-6">
        <div className="space-y-10">
          <Heart size={40} className="mx-auto text-accent/50 animate-pulse" />
          <h2 className="text-3xl md:text-[6vw] font-display text-accent italic font-bold leading-[1] tracking-tighter">
            Створимо вашу <br className="hidden md:block"/> історію разом
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-40">
          <a href="#" className="group flex flex-col items-center gap-6">
            <motion.div 
              whileHover={{ y: -12, scale: 1.1 }}
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent transition-all duration-700 group-hover:bg-accent group-hover:text-base group-hover:border-accent"
            >
              <Instagram size={28} />
            </motion.div>
            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] font-bold text-ink/80">Instagram</span>
          </a>
          <a href="#" className="group flex flex-col items-center gap-6">
            <motion.div 
              whileHover={{ y: -12, scale: 1.1 }}
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent transition-all duration-700 group-hover:bg-accent group-hover:text-base group-hover:border-accent"
            >
              <Mail size={28} />
            </motion.div>
            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] font-bold text-ink/80">Email</span>
          </a>
          <a href="#" className="group flex flex-col items-center gap-6">
            <motion.div 
              whileHover={{ y: -12, scale: 1.1 }}
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent transition-all duration-700 group-hover:bg-accent group-hover:text-base group-hover:border-accent"
            >
              <Phone size={28} />
            </motion.div>
            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] font-bold text-ink/80">Телефон</span>
          </a>
        </div>

        <div className="pt-32 md:pt-48 border-t border-accent/10">
          <div className="grid md:grid-cols-3 gap-12 items-center text-[10px] uppercase tracking-[0.4em] font-bold text-ink/80">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <MapPin size={14} className="text-accent/50" />
              <span>Київ, Україна</span>
            </div>
            <div className="text-center font-logo text-ink text-sm tracking-widest">
              TETIANA KLOCHKO
            </div>
            <div className="flex items-center justify-center md:justify-end gap-4">
              <Phone size={14} className="text-accent/50" />
              <span>+380 99 000 00 00</span>
            </div>
          </div>
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] uppercase tracking-[0.6em] text-ink/60 font-bold italic">
            <span>© 2026 Всі права захищені</span>
            <div className="flex gap-10 md:gap-20">
              <span className="hover:text-accent cursor-pointer transition-colors">Політика конфіденційності</span>
              <span className="hover:text-accent cursor-pointer transition-colors">Умови використання</span>
            </div>
            <span className="text-accent/80">Premium Photography Service</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-base overflow-x-hidden bg-base">
      <CustomCursor />
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <Hero onOpenBooking={() => setIsBookingOpen(true)} />
      <Portfolio />
      <AboutAndContact />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
