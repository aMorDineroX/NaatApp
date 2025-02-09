import { useState, useEffect } from 'react';

export const useActiveSection = (sections) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset;
      let current = '';

      sections.forEach((section) => {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const sectionTop = element.offsetTop - 100;
          const sectionBottom = sectionTop + element.offsetHeight;
          if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return activeSection;
};
