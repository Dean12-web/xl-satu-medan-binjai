import { useEffect } from 'react';
import { pageSeoData, siteSeoConfig, generateJsonLdSchema } from '../data/seoData';

export default function SeoHead({ activePage = 'home' }) {
  useEffect(() => {
    const page = pageSeoData[activePage] || pageSeoData.home;
    const title = page.title || siteSeoConfig.defaultTitle;
    const description = page.description || siteSeoConfig.defaultDescription;
    const keywords = page.keywords || siteSeoConfig.defaultKeywords;
    const canonicalUrl = `${siteSeoConfig.baseUrl}${page.path === '/' ? '' : page.path}`;

    // 1. Update Document Title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // 3. OpenGraph Meta
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', siteSeoConfig.defaultImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteSeoConfig.siteName);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', siteSeoConfig.locale);

    // 4. Twitter Card Meta
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', siteSeoConfig.defaultImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Schema Script
    let schemaScript = document.getElementById('schema-json-ld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'schema-json-ld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(generateJsonLdSchema(activePage));
  }, [activePage]);

  return null;
}
