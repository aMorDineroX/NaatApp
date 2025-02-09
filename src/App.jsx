import React, { useState, Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Menu } from '@headlessui/react';
import { GrowthChart, UsageStats } from './components/Charts';
import Timeline from './components/Timeline';
import FAQ from './components/FAQ';
import './i18n/config';
import Testimonials from './components/Testimonials';
import Notification from './components/Notification';
import ScrollToTop from './components/ScrollToTop';
import { useActiveSection } from './hooks/useActiveSection';

// Nouveau composant pour le menu mobile amélioré
const MobileMenu = ({ isOpen, setIsOpen, items, onItemClick }) => (
  <motion.div
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
    onClick={() => setIsOpen(false)}
  >
    <motion.div
      className="absolute right-0 top-0 h-full w-64 bg-white p-6"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex flex-col space-y-4">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className="text-left text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200"
          >
            {item.label}
          </button>
        ))}
        <button className="btn btn-primary mt-4">
          Commencer
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// Hook personnalisé pour le défilement
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

const NAVIGATION_ITEMS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'marche', label: 'Marché' },
  { id: 'solution', label: 'Solution' },
  { id: 'equipe', label: 'Équipe' },
  { id: 'contact', label: 'Contact' }
];

const NavLink = ({ href, isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all duration-200 relative group
      ${isActive 
        ? 'text-blue-600 dark:text-blue-400 font-medium' 
        : 'text-gray-700 dark:text-gray-300'
      }`}
  >
    <span className={`absolute inset-0 rounded-lg transition-all duration-200
      ${isActive 
        ? 'bg-blue-100 dark:bg-blue-900/50' 
        : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800'
      }`}
    />
    <span className="relative z-10">{children}</span>
  </button>
);

// Navbar améliorée
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const activeSection = useActiveSection(NAVIGATION_ITEMS.map(item => item.id));

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Ajustement pour la navbar fixe
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full transition-all duration-300 z-50 
        ${scrollPosition > 50 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800' 
          : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                NAAT
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              {NAVIGATION_ITEMS.map(item => (
                <NavLink
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  isActive={activeSection === item.id}
                >
                  {item.label}
                </NavLink>
              ))}
              <button className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:shadow-lg hover:scale-105 transition-all duration-200">
                Commencer
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-transparent border-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                <option value="fr" className="bg-white dark:bg-gray-800">Français</option>
                <option value="en" className="bg-white dark:bg-gray-800">English</option>
                <option value="wo" className="bg-white dark:bg-gray-800">Wolof</option>
              </select>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-xl">{isDarkMode ? '🌞' : '🌙'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} items={NAVIGATION_ITEMS} onItemClick={scrollToSection} />
    </>
  );
};

// Section améliorée avec des animations plus sophistiquées
const Section = ({ title, children, bgColor = 'bg-white' }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-50px'
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${bgColor} py-20 px-4 sm:px-6 lg:px-8 transition-all duration-500`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {title && (
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-12 text-center">
            {title}
          </h2>
        )}
        {children}
      </div>
    </motion.div>
  );
};

const Card = ({ title, children, icon }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
    <div className="text-center mb-6">
      <span className="text-5xl text-blue-600 bg-blue-50 p-4 rounded-xl inline-block">{icon}</span>
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">{title}</h3>
    {children}
  </div>
);

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {[
      { number: '500k+', label: 'Utilisateurs potentiels', icon: '👥' },
      { number: '2M$', label: 'Transactions annuelles', icon: '💰' },
      { number: '99.9%', label: 'Disponibilité', icon: '⚡' },
      { number: '24/7', label: 'Support client', icon: '🌟' }
    ].map(stat => (
      <div key={stat.label} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="text-4xl mb-4">{stat.icon}</div>
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">{stat.number}</div>
        <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
      </div>
    ))}
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="text-center group">
    <div className="w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-100 to-blue-200 
                    flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 
                    shadow-lg group-hover:shadow-xl">
      <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{image}</span>
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h3>
    <p className="text-blue-600 font-medium">{role}</p>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">NAAT</h3>
          <p className="text-gray-400">La nouvelle façon de gérer vos tontines</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact</h4>
          <p className="text-gray-400">Email: contact@naat.com</p>
          <p className="text-gray-400">Tél: +221 XX XXX XX XX</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Suivez-nous</h4>
          <div className="flex space-x-4">
            {['📱', '💼', '🐦', '📸'].map((icon, i) => (
              <a key={i} href="#" className="text-2xl hover:text-blue-400 transition-colors">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Composant principal App amélioré
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const solutions = [
    { title: 'Tontines digitalisées', icon: '💳', desc: 'Gestion sécurisée et transparente' },
    { title: 'Tontines spécifiques', icon: '🎯', desc: 'Pour vos projets d\'achat' },
    { title: 'Cagnottes', icon: '💰', desc: 'Collecte de fonds simplifiée' },
    { title: 'Microcrédits', icon: '📈', desc: 'Solutions de financement flexibles' },
    { title: 'Application intuitive', icon: '📱', desc: 'Simple et accessible' }
  ];

  useEffect(() => {
    // Détecter la préférence système pour le mode sombre
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        type: 'success',
        message: 'Message envoyé avec succès !'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Erreur lors de l\'envoi du message.'
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* ScrollToTop Button */}
      <ScrollToTop />

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gray-800 text-white dark:bg-white dark:text-gray-800"
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>

      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* Hero Section amélioré */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-40"
        id="accueil"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-7xl font-bold mb-8 animate-fade-in">NAAT</h1>
          <p className="text-3xl mb-8 text-blue-100">PRÉSENTÉ PAR M. SEYANBOU GAYE</p>
          <p className="text-4xl font-semibold inline-block px-8 py-4 rounded-full 
                       bg-white/10 backdrop-blur-sm border border-white/20">
            La nouvelle Tontine c'est NAAT
          </p>
        </div>
      </motion.div>

      {/* Sections avec animations de défilement */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
      >
        <div id="introduction">
          <Section title="INTRODUCTION">
            <div className="prose lg:prose-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
              <p className="text-gray-600 text-center leading-relaxed">
                Le marché dans lequel nous évoluons est fortement imprégné de la culture des
                tontines. En Afrique de l'Ouest, près d'un individu sur cinq a déjà participé
                à une tontine ou connaît quelqu'un qui y a pris part.
              </p>
            </div>
          </Section>
        </div>

        <div id="marche">
          <Section title="NOTRE MARCHÉ CIBLE" bgColor="bg-gray-50">
            <div className="grid md:grid-cols-2 gap-8">
              <Card title="Populations locales" icon="🌍">
                <ul className="list-none space-y-3 text-gray-600">
                  <li className="flex items-center"><span className="mr-2">👥</span>20-45 ans</li>
                  <li className="flex items-center"><span className="mr-2">📊</span>7,8 millions de personnes au Sénégal</li>
                </ul>
              </Card>
              <Card title="Diaspora sénégalaise" icon="🌐">
                <ul className="list-none space-y-3 text-gray-600">
                  <li className="flex items-center"><span className="mr-2">🇫🇷</span>160 000 personnes en France</li>
                  <li className="flex items-center"><span className="mr-2">💸</span>2 milliards USD par an d'envois</li>
                </ul>
              </Card>
            </div>
          </Section>
        </div>

        <div id="solution">
          <Section title="NOTRE SOLUTION">
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((item) => (
                <Card key={item.title} title={item.title} icon={item.icon}>
                  <p className="text-gray-600">{item.desc}</p>
                </Card>
              ))}
            </div>
          </Section>
        </div>

        <Section title="STATISTIQUES" bgColor="bg-blue-50">
          <Stats />
          <p className="text-center mt-8 text-2xl font-bold gradient-text-secondary">
            Des chiffres qui parlent d'eux-mêmes
          </p>
        </Section>

        <Section title="STATISTIQUES ET ANALYSES" bgColor="bg-blue-50">
          <div className="grid md:grid-cols-2 gap-8">
            <GrowthChart />
            <UsageStats />
          </div>
        </Section>

        <div id="equipe">
          <Section title="NOTRE ÉQUIPE" bgColor="bg-gray-50">
            <p className="text-center mb-8 text-xl gradient-text-primary">
              Une équipe passionnée à votre service
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { name: 'M. Seyanbou Gaye', role: 'Fondateur', image: '👨‍💼' },
                { name: 'M. Ariel Sidrielki', role: 'Conseiller', image: '👨‍💻' },
                { name: 'M. Aly Kébé', role: 'Co-fondateur', image: '👨‍🚀' },
                { name: 'Mme Rachel Atangana', role: 'Marketing', image: '👩‍💼' }
              ].map(member => (
                <TeamMember key={member.name} {...member} />
              ))}
            </div>
          </Section>
        </div>

        <Section title="NOTRE PARCOURS" bgColor="bg-gray-50">
          <Suspense fallback={<div>Loading...</div>}>
            <Timeline />
          </Suspense>
        </Section>

        <Section title="TÉMOIGNAGES" bgColor="bg-blue-50">
          <Testimonials />
        </Section>

        <Section title="QUESTIONS FRÉQUENTES">
          <Suspense fallback={<div>Loading...</div>}>
            <FAQ />
          </Suspense>
        </Section>

        <div id="contact">
          <Section title="CONTACTEZ-NOUS" bgColor="bg-white">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="input-primary"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="input-primary"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <textarea
                    placeholder="Votre message"
                    rows="4"
                    className="input-primary"
                    required
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn btn-primary"
                >
                  Envoyer
                </motion.button>
              </form>
            </div>
          </Section>
        </div>

        <Section bgColor="bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <p className="text-gray-700 text-center italic text-lg leading-relaxed">
                "NAAT, c'est avant tout une aventure humaine portée par une équipe engagée
                et complémentaire. Nous collaborons avec des experts pour assurer la réussite
                du projet à chaque étape."
              </p>
            </div>
          </div>
        </Section>
      </motion.div>

      <Footer />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-4 bg-gray-900"
      >
        <p className="gradient-text-secondary">© 2024 NAAT - Tous droits réservés</p>
      </motion.div>
    </div>
  );
};

export default App;
