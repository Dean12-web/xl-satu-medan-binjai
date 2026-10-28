import { useEffect, useState } from 'react';
import { pageSeoData as fallbackPageSeo, siteSeoConfig as fallbackGlobalSeo, generateJsonLdSchema } from '../data/seoData';
import { publicSeoService, publicPackageService } from '../services/api';

export default function SeoHead({ activePage = 'home' }) {
  const [globalSeo, setGlobalSeo] = useState(fallbackGlobalSeo);
  const [pageSeo, setPageSeo] = useState(fallbackPageSeo[activePage] || fallbackPageSeo.home);
  const [livePackages, setLivePackages] = useState(null);

  // Fetch global SEO once
  useEffect(() => {
    let isMounted = true;
    const fetchGlobal = async () => {
      try {
        const data = await publicSeoService.getGlobalSeo();
        if (isMounted && data) {
          setGlobalSeo((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.warn('Gagal fetch global SEO dari API, pakai fallback:', error);
      }
    };
    fetchGlobal();
    return () => { isMounted = false; };
  }, []);

  // Fetch package catalog for JSON-LD schema
  useEffect(() => {
    let isMounted = true;
    const fetchPackages = async () => {
      try {
        const data = await publicPackageService.getPackages();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setLivePackages(data);
        }
      } catch {
        // Fallback default
      }
    };
    fetchPackages();
    return () => { isMounted = false; };
  }, []);

  // Fetch page specific SEO when activePage changes
  useEffect(() => {
    let isMounted = true;
    const fetchPage = async () => {
      try {
        const data = await publicSeoService.getPageSeo(activePage);
        if (isMounted && data && data.title) {
          setPageSeo(data);
        } else if (isMounted) {
          setPageSeo(fallbackPageSeo[activePage] || fallbackPageSeo.home);
        }
      } catch {
        if (isMounted) {
          setPageSeo(fallbackPageSeo[activePage] || fallbackPageSeo.home);
        }
      }
    };
    fetchPage();
    return () => { isMounted = false; };
  }, [activePage]);

  // Update DOM tags
  useEffect(() => {
    const page = pageSeo || fallbackPageSeo[activePage] || fallbackPageSeo.home;
    const config = globalSeo || fallbackGlobalSeo;

    const title = page.title || config.defaultTitle;
    const description = page.description || config.defaultDescription;
    const keywords = page.keywords || config.defaultKeywords;
    const canonicalUrl = `${config.baseUrl}${page.path === '/' ? '' : (page.path || '')}`;
    const ogImg = page.ogImage || page.og_image || config.defaultImage;

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
      element.setAttribute('content', content || '');
    };

    // 2. Standard Meta
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // 3. OpenGraph Meta
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImg);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', config.siteName);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', config.locale);

    // 4. Twitter Card Meta
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImg);

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
    schemaScript.textContent = JSON.stringify(generateJsonLdSchema(activePage, livePackages));
  }, [activePage, pageSeo, globalSeo, livePackages]);

  return null;
}
