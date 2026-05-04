"use client";

import { useEffect, useState } from 'react';

const whatsappLink = "https://wa.me/27760578078?text=Hi%20ASD%20Cafe%2C%20I%E2%80%99d%20like%20to%20place%20an%20order.";

// UPDATE THESE URLs once your restaurant is live on each platform:
// Uber Eats: find your restaurant at https://www.ubereats.com and copy the URL
// Mr D Food: find your restaurant at https://www.mrdfood.com and copy the URL
const uberEatsLink = "https://www.ubereats.com/za";
const mrDeliveryLink = "https://www.mrdfood.com";

// Placeholder for menu items that don't yet have a real photo
const placeholderImage = "/images/burger_photo.png";

export default function Home() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loaderEl = document.getElementById('loader');
    const barEl = document.getElementById('loader-bar');
    const hero = document.getElementById('heroContent');

    let progress = 0;
    const interval = setInterval(function () {
      progress += Math.random() * 18 + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (loaderEl) {
          loaderEl.style.transition = 'opacity 0.4s';
          loaderEl.style.opacity = '0';
          setTimeout(function () { if (loaderEl) loaderEl.style.display = 'none'; }, 420);
        }
      }
      if (barEl) barEl.style.width = Math.min(progress, 100) + '%';
    }, 40);

    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = window.innerHeight;
      if (hero) {
        const progress = Math.min(scrollY / heroHeight, 1);
        const opacity = Math.max(0, 1 - progress * 2.5);
        const translateY = -scrollY * 0.3;
        hero.style.opacity = opacity;
        hero.style.transform = `translateY(${translateY}px)`;
        hero.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto';
      }
    }

    const onMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      {hoveredImage && (
        <div style={{
          position: 'fixed',
          top: cursorPos.y + 15,
          left: cursorPos.x + 15,
          pointerEvents: 'none',
          zIndex: 9999,
          width: '260px',
          height: '260px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0px 14px 40px rgba(0,0,0,0.6)',
          border: '4px solid var(--red)',
          background: 'var(--black)'
        }}>
          <img src={hoveredImage} alt="Preview" style={{width: '100%', height:'100%', objectFit: 'cover'}} />
        </div>
      )}

      <div id="loader" aria-hidden="true">
        <div id="loaderWrap"><div id="loader-bar"></div></div>
        <p style={{marginTop: '15px', color:'#D7262E', font: `12px 'Bebas Neue',sans-serif`, letterSpacing:'3px'}}>HEATING UP THE GRILL...</p>
      </div>

      <div className="noise-overlay" aria-hidden="true"></div>

      {/* ========== NAVIGATION ========== */}
      <nav className="nav-pill" aria-label="Main navigation">
        <div className="brand">
          <img src="/images/real_asd_logo.png" alt="ASD Cafe Logo" style={{transform: 'scale(2)', marginLeft:'14px', marginTop:'5px', marginBottom: '5px'}}/>
        </div>
        <div className="nav-ctas">
          <a href={uberEatsLink} className="btn btn-delivery uber-btn" target="_blank" rel="noopener noreferrer" aria-label="Order on Uber Eats">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:'6px'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            UBER EATS
          </a>
          <a href={mrDeliveryLink} className="btn btn-delivery mrd-btn" target="_blank" rel="noopener noreferrer" aria-label="Order on Mr Delivery">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:'6px'}}><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
            MR D
          </a>
          <a href={whatsappLink} className="btn btn-primary" id="nav-whatsapp">ORDER NOW</a>
          <a href="#menu-start" className="btn btn-secondary" id="nav-menu">MENU</a>
          <a href="#gallery" className="btn btn-secondary" id="nav-gallery">GALLERY</a>
        </div>
      </nav>

      {/* ========== WHATSAPP FLOAT ========== */}
      <a href={whatsappLink} className="whatsapp-float" aria-label="Order via WhatsApp — +27 76 057 8078" title="WhatsApp us: +27 76 057 8078">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.449-1.271.608-1.445.159-.175.348-.218.463-.218.116 0 .231.001.334.005.109.004.254-.041.398.305.144.346.491 1.197.535 1.284.044.087.073.188.014.305-.058.116-.087.188-.174.289-.087.101-.183.227-.261.304-.087.087-.178.183-.077.357.101.174.449.741.964 1.201.662.591 1.221.774 1.395.86s.275.072.376-.044c.101-.116.434-.506.549-.68.116-.174.231-.144.39-.087s1.013.477 1.186.564c.174.087.289.13.333.202.043.073.043.419-.101.824z"/></svg>
      </a>

      {/* ========== HERO SECTION ========== */}
      <section id="heroSection" aria-labelledby="hero-heading">
        <div className="hero-car">
          <img src="/images/burger_photo.png" alt="Gourmet Burger" style={{width: '320px', borderRadius: '12px', border: '4px solid var(--black)', boxShadow: '8px 8px 0 var(--black)'}} />
        </div>

        <div id="heroContent">
          <h1 id="hero-heading">STREET HEAT.<br/>FAST EATS.</h1>
          <div className="tagline" style={{marginTop: '20px', marginBottom: '20px', textTransform:'none', letterSpacing:'1px', fontSize:'22px'}}>Smoked brisket. Loaded burgers. No waiting around.</div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginBottom: '36px', fontSize: '18px', fontWeight: 'bold', color: 'var(--cream)'}}>
            <div>🔥 Made fresh</div>
            <div>🔥 Fast pickup</div>
            <div>🔥 Built for real hunger</div>
          </div>

          {/* ORDER BUTTONS */}
          <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px'}}>
            <a href={whatsappLink} className="btn btn-primary" id="hero-order-btn" style={{padding: '14px 32px', fontSize: '20px'}}>
              ORDER ON WHATSAPP &rarr;
            </a>
          </div>
          <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href={uberEatsLink} className="btn btn-delivery uber-btn" target="_blank" rel="noopener noreferrer" style={{padding: '12px 28px', fontSize: '17px'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:'8px'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
              ORDER ON UBER EATS
            </a>
            <a href={mrDeliveryLink} className="btn btn-delivery mrd-btn" target="_blank" rel="noopener noreferrer" style={{padding: '12px 28px', fontSize: '17px'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:'8px'}}><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
              ORDER ON MR D
            </a>
          </div>

          <div style={{marginTop: '16px', fontSize: '18px', fontWeight: 'bold', color: 'rgba(245,230,211,0.9)'}}>
            ⚡ Ready in 15–20 mins. No waiting around.
          </div>
        </div>
      </section>

      <main id="pageRoot">
        {/* ========== MOST ORDERED ========== */}
        <section className="menu-section alt-bg" id="most-ordered" style={{paddingTop: '60px', paddingBottom: '60px'}}>
          <div className="section-inner">
            <div className="section-content" style={{maxWidth: '100%', margin: '0 auto', textAlign: 'center'}}>
              <div style={{fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', color: '#333', marginBottom: '10px', textTransform: 'uppercase'}}>🔥 BEST SELLERS — ORDER THESE FIRST</div>
              <h2 style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: '64px', color: 'var(--red)', marginBottom: '10px'}}>🔥 MOST ORDERED</h2>
              <p style={{fontSize: '22px', fontWeight: 'bold', marginTop: '0', marginBottom: '40px', color: '#333'}}>Don't overthink it. Start here 👇</p>

              <div style={{display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center'}}>

                <div style={{flex: '1', minWidth: '280px', background: 'var(--cream)', border: '4px solid var(--black)', padding: '24px', boxShadow: '8px 8px 0 var(--black)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                     onMouseEnter={() => setHoveredImage('/images/brisket_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <img src="/images/brisket_photo.png" alt="Smoked Brisket Burger at ASD Cafe" style={{width: '100%', height:'200px', objectFit:'cover', borderRadius: '8px', border: '2px solid var(--black)', marginBottom: '20px'}} />
                  <h3 style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: '32px', margin: '0 0 10px'}}>BRISKET BURGER</h3>
                  <p style={{fontSize: '16px', fontWeight: 500, margin: '0 0 15px', color:'#333'}}>Smoked pulled brisket, slaw, ASD sauce</p>
                  <div style={{fontSize: '28px', fontFamily: `'Bebas Neue', sans-serif`, color: 'var(--red)', marginTop: 'auto'}}>R105</div>
                </div>

                <div style={{flex: '1', minWidth: '280px', background: 'var(--cream)', border: '4px solid var(--black)', padding: '24px', boxShadow: '8px 8px 0 var(--black)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                     onMouseEnter={() => setHoveredImage('/images/burger_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <img src="/images/burger_photo.png" alt="Cheese Burger at ASD Cafe" style={{width: '100%', height:'200px', objectFit:'cover', borderRadius: '8px', border: '2px solid var(--black)', marginBottom: '20px'}} />
                  <h3 style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: '32px', margin: '0 0 10px'}}>CHEESE BURGER 🔥</h3>
                  <p style={{fontSize: '16px', fontWeight: 500, margin: '0 0 15px', color:'#333'}}>Juicy beef, cheddar, ASD sauce</p>
                  <div style={{fontSize: '28px', fontFamily: `'Bebas Neue', sans-serif`, color: 'var(--red)', marginTop: 'auto'}}>R100</div>
                </div>

                <div style={{flex: '1', minWidth: '280px', background: 'var(--cream)', border: '4px solid var(--black)', padding: '24px', boxShadow: '8px 8px 0 var(--black)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                     onMouseEnter={() => setHoveredImage('/images/loaded_fries_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <img src="/images/loaded_fries_photo.png" alt="Loaded Fries at ASD Cafe" style={{width: '100%', height:'200px', objectFit:'cover', borderRadius: '8px', border: '2px solid var(--black)', marginBottom: '20px'}} />
                  <h3 style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: '32px', margin: '0 0 10px'}}>LOADED FRIES</h3>
                  <p style={{fontSize: '16px', fontWeight: 500, margin: '0 0 15px', color:'#333'}}>Brisket, cheese, sauce. No sharing.</p>
                  <div style={{fontSize: '28px', fontFamily: `'Bebas Neue', sans-serif`, color: 'var(--red)', marginTop: 'auto'}}>R45</div>
                </div>

              </div>

              <div style={{marginTop: '40px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                <a href={whatsappLink} className="btn btn-primary" style={{padding: '14px 32px', fontSize: '20px'}}>ORDER ON WHATSAPP &rarr;</a>
                <a href={uberEatsLink} className="btn btn-delivery uber-btn" target="_blank" rel="noopener noreferrer" style={{padding: '14px 24px', fontSize: '18px'}}>UBER EATS</a>
                <a href={mrDeliveryLink} className="btn btn-delivery mrd-btn" target="_blank" rel="noopener noreferrer" style={{padding: '14px 24px', fontSize: '18px'}}>MR D</a>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== BURGERS ========== */}
        <section className="menu-section" id="menu-start" aria-labelledby="burgers-heading">
          <div className="section-inner">
            <div className="section-content">
              <div className="joke-bubble">No clean hands. No regrets.</div>
              <div className="menu-header">
                <h2 id="burgers-heading">🍔 BURGERS</h2>
              </div>
              <div className="menu-items">
                <div className="menu-row" onMouseEnter={() => setHoveredImage('/images/brisket_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">BRISKET BURGER 🔥</h3>
                    <p className="item-desc">Smoked pulled brisket, slaw, ASD sauce</p>
                  </div>
                  <div className="item-price">R105</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage('/images/burger_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">CHEESE BURGER 🔥 <span className="tag">MOST ORDERED</span></h3>
                    <p className="item-desc">Beef patty, cheddar, ASD sauce</p>
                  </div>
                  <div className="item-price">R100</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">BEEF BURGER</h3>
                    <p className="item-desc">Classic grilled beef, lettuce, tomato</p>
                  </div>
                  <div className="item-price">R85</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">CHICKEN BURGER</h3>
                    <p className="item-desc">Grilled chicken, ASD sauce, fresh crunch</p>
                  </div>
                  <div className="item-price">R75</div>
                </div>
                <div style={{marginTop: '20px', fontWeight: 'bold', color: 'var(--red)', fontSize: '14px'}}>
                  ADD ONS: Cheese R25 | Bacon R30 | Patty R35
                </div>
                <div style={{marginTop: '15px', fontWeight: 'bold', color: '#333', fontSize: '14px'}}>
                  MAKE IT A MEAL:<br/>
                  • Chips & Drink R25<br/>
                  • Loaded Fries Upgrade R35
                </div>
                <div style={{marginTop: '30px'}}>
                  <a href={whatsappLink} className="btn btn-secondary">ORDER IN 60 SECONDS &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== PIZZA ========== */}
        <section className="menu-section alt-bg" aria-labelledby="pizza-heading">
          <div className="section-inner reverse">
            <div className="section-content" style={{maxWidth: '100%'}}>
              <div className="joke-bubble" style={{transform: 'rotate(2deg)'}}>No sharing. We don't judge.</div>
              <div className="menu-header">
                <h2 id="pizza-heading">🍕 PIZZA</h2>
              </div>
              <div className="menu-items">
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">MARGHERITA</h3>
                    <p className="item-desc">Simple. Done right.</p>
                  </div>
                  <div className="item-price">R95</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">HAM & MUSHROOM</h3>
                    <p className="item-desc">Classic combo. Always hits.</p>
                  </div>
                  <div className="item-price">R115</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">BBQ CHICKEN</h3>
                    <p className="item-desc">Sweet, smoky, loaded</p>
                  </div>
                  <div className="item-price">R110</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">BACON FETA AVOCADO</h3>
                    <p className="item-desc">Rich. Salty. Dangerous.</p>
                  </div>
                  <div className="item-price">R125</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage('/images/brisket_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">PULLED BRISKET 🔥</h3>
                    <p className="item-desc">Smoked brisket takeover</p>
                  </div>
                  <div className="item-price">R135</div>
                </div>
                <div style={{marginTop: '20px', fontWeight: 'bold', color: 'var(--red)', fontSize: '14px', lineHeight: '1.6'}}>
                  EXTRAS:<br/>
                  Mozzarella R35 | Chicken R35 | Brisket R40<br/>
                  Bacon R35 | Mushrooms R30
                </div>
                <div style={{marginTop: '30px'}}>
                  <a href={whatsappLink} className="btn btn-secondary">ORDER IN 60 SECONDS &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== WINGS & SIDES ========== */}
        <section className="menu-section" aria-labelledby="wings-heading">
          <div className="section-inner">
            <div className="section-content">
              <div className="joke-bubble">Napkins won't save you.</div>
              <div className="menu-header">
                <h2 id="wings-heading">🔥 WINGS & SIDES</h2>
              </div>
              <div className="menu-items">
                <p className="item-desc" style={{marginBottom:'20px', fontSize:'16px'}}>
                  <strong>CHICKEN WINGS</strong><br/>
                  3 full wings, your sauce of choice<br/>
                  (Lemon pepper / Peri peri / BBQ / ASD)<br/>
                  <em style={{fontSize:'14px', color: 'var(--red)'}}>Served with chips or salad + garlic mayo</em>
                </p>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}><div className="item-info"><h3 className="item-name">3 WINGS</h3></div><div className="item-price">R75</div></div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}><div className="item-info"><h3 className="item-name">6 WINGS</h3></div><div className="item-price">R140</div></div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}><div className="item-info"><h3 className="item-name">9 WINGS</h3></div><div className="item-price">R180</div></div>

                <div className="menu-row" style={{marginTop: '20px'}} onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info"><h3 className="item-name">CHIPS</h3></div>
                  <div className="item-price">R15</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage('/images/loaded_fries_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">LOADED FRIES 🔥</h3>
                    <p className="item-desc">Brisket, ASD sauce, mozzarella & cheddar</p>
                  </div>
                  <div className="item-price">R45</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">GREEN SALAD</h3>
                    <p className="item-desc">Fresh, light, no nonsense</p>
                  </div>
                  <div className="item-price">R25</div>
                </div>
                <div style={{marginTop: '30px'}}>
                  <a href={whatsappLink} className="btn btn-secondary">ORDER IN 60 SECONDS &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== WRAPS & BOWLS ========== */}
        <section className="menu-section alt-bg" aria-labelledby="wraps-heading">
          <div className="section-inner reverse">
            <div className="section-content" style={{maxWidth: '100%', margin: '0 auto'}}>
              <div className="menu-header" style={{textAlign: 'center'}}>
                <h2 id="wraps-heading">🌯 WRAPS & BOWLS</h2>
              </div>
              <div className="menu-items" style={{maxWidth: '600px', margin: '0 auto'}}>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">GRILLED CHICKEN WRAP</h3>
                    <p className="item-desc">Lettuce, cucumber, lite peri mayo</p>
                  </div>
                  <div className="item-price">R65</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">HALLOUMI WRAP</h3>
                    <p className="item-desc">Lettuce, cucumber, sweet chilli</p>
                  </div>
                  <div className="item-price">R75</div>
                </div>
                <div style={{marginTop: '0px', marginBottom: '40px', fontWeight: 'bold', color: 'var(--red)', fontSize: '14px'}}>
                  ADD ONS: Chicken R30 | Halloumi R35
                </div>

                <div className="menu-header">
                  <h2>SALADS & BOWLS</h2>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">HALLOUMI SALAD</h3>
                    <p className="item-desc">Fresh veg, olives, balanced</p>
                  </div>
                  <div className="item-price">R75</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage(placeholderImage)} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">CHICKEN PROTEIN SALAD</h3>
                    <p className="item-desc">Light, clean, filling</p>
                  </div>
                  <div className="item-price">R65</div>
                </div>
                <div className="menu-row" onMouseEnter={() => setHoveredImage('/images/brisket_photo.png')} onMouseLeave={() => setHoveredImage(null)}>
                  <div className="item-info">
                    <h3 className="item-name">BRISKET PROTEIN BOWL 🔥</h3>
                    <p className="item-desc">Quinoa, veg, smoked brisket</p>
                  </div>
                  <div className="item-price">R95</div>
                </div>
                <div style={{marginTop: '30px', textAlign: 'center'}}>
                  <a href={whatsappLink} className="btn btn-secondary">ORDER IN 60 SECONDS &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== WHY ASD ========== */}
        <section className="menu-section" style={{background: 'var(--black)', color: 'white', padding: '80px 5vw'}} aria-labelledby="why-heading">
          <div style={{maxWidth: '700px', margin: '0 auto', textAlign: 'center'}}>
            <h2 id="why-heading" style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: 'clamp(48px, 7vw, 64px)', color: 'var(--red)', margin: '0 0 30px'}}>🔥 WHY ASD?</h2>
            <div style={{fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 500, lineHeight: '1.8', margin: '0 0 30px', textAlign: 'left', display: 'inline-block'}}>
              <div>✔ Real smoked brisket — no shortcuts</div>
              <div>✔ Fast pickup — no waiting around</div>
              <div>✔ Built for workers, not influencers</div>
              <div>✔ Portions that actually fill you</div>
            </div>
            <p style={{fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 'bold', color: 'var(--red)', maxWidth: '600px', margin: '0 auto'}}>You don't need fancy. You need good food. Fast.</p>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== LUNCH SERVICE ========== */}
        <section className="menu-section" style={{background:'var(--cream)'}} aria-labelledby="combos-heading">
          <div className="combo-block" style={{textAlign: 'center'}}>
            <div className="joke-bubble" style={{background: 'var(--red)', borderColor: 'white', color: 'white', transform: 'rotate(0deg)'}}>Corporate & bulk orders only</div>
            <h3 id="combos-heading" style={{marginTop: '15px'}}>🥡 LUNCH SERVICE</h3>
            <p style={{fontSize: '24px', fontFamily: `'Bebas Neue', sans-serif`, marginBottom:'10px'}}>WEEKLY SET MENUS</p>
            <p style={{fontSize: '18px', fontWeight:500, marginBottom:'30px'}}>
              <strong style={{color:'var(--red)'}}>Pick 5 meals — 5% off<br/>Pick 10 meals — 7.5% off<br/>Pick 15 meals — 10% off</strong>
            </p>
            <p style={{fontSize: '15px', maxWidth: '600px', margin: '0 auto', opacity: 0.8}}>
              Orders must be placed before 9AM for same-day delivery.
            </p>
            <div style={{marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <a href={whatsappLink} className="btn btn-secondary">ORDER IN 60 SECONDS &rarr;</a>
              <a href="mailto:orders@asdcafe.com" className="btn btn-delivery" style={{background:'var(--red)', color:'white', borderColor:'white'}}>EMAIL ORDERS@ASDCAFE.COM</a>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== GALLERY ========== */}
        <section id="gallery" aria-labelledby="gallery-heading" style={{background: 'var(--black)', padding: '80px 5vw', scrollMarginTop: '80px'}}>
          <div className="gallery-inner" style={{maxWidth: '1140px', margin: '0 auto', textAlign: 'center'}}>
            <h2 id="gallery-heading" style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: 'clamp(52px, 7vw, 84px)', color: 'var(--cream)', margin: '0 0 12px'}}>FOOD GALLERY</h2>
            <p className="subtitle" style={{fontSize: '14px', letterSpacing: '3px', color: 'rgba(245,230,211,0.6)', textTransform: 'uppercase', marginBottom: '50px'}}>OUR FOOD. YOUR HUNGER.</p>

            <div className="menu-images" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', justifyItems: 'center'}}>
              <img src="/images/burger_photo.png" alt="ASD Cafe Gourmet Cheese Burger" style={{width: '100%', height:'350px', objectFit:'cover', border: '4px solid var(--red)', boxShadow: '8px 8px 0 var(--red)', transition: 'transform 0.2s', borderRadius: '12px'}} />
              <img src="/images/brisket_photo.png" alt="ASD Cafe 12-Hour Smoked Brisket" style={{width: '100%', height:'350px', objectFit:'cover', border: '4px solid var(--red)', boxShadow: '8px 8px 0 var(--red)', transition: 'transform 0.2s', borderRadius: '12px'}} />
              <img src="/images/loaded_fries_photo.png" alt="ASD Cafe Loaded Fries" style={{width: '100%', height:'350px', objectFit:'cover', border: '4px solid var(--red)', boxShadow: '8px 8px 0 var(--red)', transition: 'transform 0.2s', borderRadius: '12px'}} />
            </div>
          </div>
        </section>

        <div className="section-divider" style={{background: 'var(--black)'}} aria-hidden="true"></div>

        {/* ========== OUR STORY ========== */}
        <section id="about" aria-labelledby="about-heading" style={{background: 'var(--cream)', padding: '80px 5vw'}}>
          <div className="about-inner" style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
            <h2 id="about-heading" style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: '64px', color: 'var(--red)', margin: '0 0 20px', lineHeight: 1}}>🔥 OUR STORY</h2>
            <p style={{fontSize: '22px', fontWeight: 500, lineHeight: 1.7, color: '#333', marginBottom: '20px'}}>
              Born in the industrial zone, ASD Cafe is built for people who don't have time to wait.
            </p>
            <p style={{fontSize: '22px', fontWeight: 500, lineHeight: 1.7, color: '#333', marginBottom: '20px'}}>
              Smoked brisket. Bold flavour. Fast takeaway.
            </p>
            <p style={{fontSize: '22px', fontWeight: 700, lineHeight: 1.7, color: '#111'}}>
              No fluff. No nonsense. Just street heat.
            </p>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ========== CONTACT SECTION ========== */}
        <section id="contact" aria-labelledby="contact-heading" style={{background: 'var(--black)', padding: '80px 5vw', scrollMarginTop: '80px'}}>
          <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
            <h2 id="contact-heading" style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: 'clamp(48px, 7vw, 72px)', color: 'var(--cream)', margin: '0 0 16px'}}>GET IN TOUCH</h2>
            <p style={{fontSize: '18px', color: 'rgba(245,230,211,0.7)', marginBottom: '50px', letterSpacing: '1px'}}>
              Questions, catering enquiries, bulk orders — we've got you covered.
            </p>

            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px'}}>

              <a href="mailto:info@asdcafe.com" className="contact-card" aria-label="Email info@asdcafe.com">
                <div className="contact-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div className="contact-card-label">GENERAL ENQUIRIES</div>
                <div className="contact-card-value">info@asdcafe.com</div>
              </a>

              <a href="mailto:sales@asdcafe.com" className="contact-card" aria-label="Email sales@asdcafe.com">
                <div className="contact-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                </div>
                <div className="contact-card-label">SALES & PARTNERSHIPS</div>
                <div className="contact-card-value">sales@asdcafe.com</div>
              </a>

              <a href="mailto:orders@asdcafe.com" className="contact-card" aria-label="Email orders@asdcafe.com">
                <div className="contact-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
                </div>
                <div className="contact-card-label">PLACE AN ORDER</div>
                <div className="contact-card-value">orders@asdcafe.com</div>
              </a>

            </div>

            <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <a href={whatsappLink} className="btn btn-primary" style={{padding: '14px 32px', fontSize: '20px'}}>
                WHATSAPP +27 76 057 8078
              </a>
            </div>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer>
          <div className="footer-content" style={{paddingTop: '60px', paddingBottom: '60px', textAlign: 'center'}}>
            <img src="/images/real_asd_logo.png" alt="ASD Cafe Logo" className="footer-logo-img" style={{maxHeight: '100px', marginBottom: '20px'}} />

            <p style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: '32px', margin: '0 0 10px'}}>STREET HEAT. FAST EATS.</p>
            <p style={{fontSize: '18px', fontWeight: 'bold', color: 'var(--red)', margin: '0 0 10px'}}>Order in 60 seconds</p>
            <p style={{fontSize: '16px', margin: '0 0 20px'}}>Fast pickup. No delays.</p>
            <p style={{fontSize: '16px', fontWeight: 'bold', color: 'var(--red)', margin: '0 0 30px'}}>⚠ Limited brisket daily. When it's gone, it's gone.</p>

            {/* ORDER PLATFORMS */}
            <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px'}}>
              <a href={whatsappLink} className="btn btn-primary" style={{padding:'12px 24px', fontSize:'17px'}}>WHATSAPP ORDER</a>
              <a href={uberEatsLink} className="btn btn-delivery uber-btn" target="_blank" rel="noopener noreferrer" style={{padding:'12px 24px', fontSize:'17px'}}>UBER EATS</a>
              <a href={mrDeliveryLink} className="btn btn-delivery mrd-btn" target="_blank" rel="noopener noreferrer" style={{padding:'12px 24px', fontSize:'17px'}}>MR D FOOD</a>
            </div>

            {/* EMAIL LINKS */}
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px', fontSize: '14px'}}>
              <a href="mailto:info@asdcafe.com" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s'}} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.7}>info@asdcafe.com</a>
              <a href="mailto:sales@asdcafe.com" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s'}} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.7}>sales@asdcafe.com</a>
              <a href="mailto:orders@asdcafe.com" style={{color: 'var(--cream)', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s'}} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.7}>orders@asdcafe.com</a>
            </div>

            <div style={{background: 'var(--red)', color: 'white', display: 'inline-block', padding: '12px 24px', border: '3px solid var(--black)', boxShadow: '6px 6px 0 var(--black)', marginBottom: '30px'}}>
              <h4 style={{fontFamily: `'Bebas Neue', sans-serif`, fontSize: '24px', margin: '0', letterSpacing: '1px'}}>Mon–Fri: 08:00 – 17:00</h4>
            </div>

            <p style={{fontSize: '14px', letterSpacing: '1px', opacity: '0.8'}}>ASD Cafe — Built for real hunger.</p>
            <p className="footer-copy" style={{marginTop: '20px'}}>African Spirits Distillery Cafe</p>
          </div>
        </footer>
      </main>
    </>
  );
}
