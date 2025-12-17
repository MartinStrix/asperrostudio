import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
}

export const SEO = ({ title, description }: SEOProps) => {
  const location = useLocation();
  const fullTitle = `${title} | AsperroStudio`;
  const fullUrl = `https://www.asperrostudio.cz${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: fullUrl },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    return () => {
      document.title = 'AsperroStudio | Profesionalni videotvorba';
    };
  }, [fullTitle, description, fullUrl]);

  return null;
};
