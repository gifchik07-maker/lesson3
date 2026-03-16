import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Instagram, Mail, Phone, ArrowRight, Camera, Sparkles, Heart, MapPin } from 'lucide-react';
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

const Navbar = () => (
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
    <motion.a 
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
      href="#contact" 
      className="group flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-accent text-base rounded-full text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-black hover:bg-ink transition-all duration-500 shadow-[0_20px_50px_rgba(229,169,169,0.4)] hover:shadow-none"
    >
      <span>Замовити</span>
      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
    </motion.a>
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

const Hero = () => (
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
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-12 py-6 bg-ink text-base rounded-full text-[12px] uppercase tracking-[0.5em] font-bold hover:bg-accent transition-all duration-500 shadow-2xl"
            >
              Забронювати дату
            </motion.a>
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
            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-accent/20">
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
  return (
    <div className="min-h-screen selection:bg-accent selection:text-base overflow-x-hidden bg-base">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Portfolio />
      <AboutAndContact />
    </div>
  );
}
