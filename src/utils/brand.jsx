export const renderBrandTagline = (tagline) => {
  const text = tagline || 'Medan, Binjai & Deli Serdang';
  if (text.includes('&')) {
    const parts = text.split('&');
    return (
      <>
        <span className="brand-tag-line">{parts[0].trim()}</span>
        <span className="brand-tag-line">&amp; {parts[1].trim()}</span>
      </>
    );
  }
  return text;
};

