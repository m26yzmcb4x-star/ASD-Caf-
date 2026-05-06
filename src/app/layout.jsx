import './globals.css'
import Script from 'next/script'

const SITE_URL = 'https://asdcafe.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ASD Cafe | Born Smoked. Served Fast. | African Spirits Distillery',
  description: 'ASD Cafe – African Spirits Distillery Cafe. Born smoked, served fast. 12-hour smoked brisket burgers, pizza, wings, wraps and corporate lunch menus in South Africa. Order via WhatsApp, Uber Eats or Mr D Food. Ready in 15–20 mins.',
  keywords: [
    'ASD Cafe', 'African Spirits Distillery Cafe', 'smoked brisket burger', 'brisket burger',
    'ghost kitchen South Africa', 'best burgers South Africa', 'street food',
    'loaded fries', 'chicken wings', 'pizza takeaway', 'wraps', 'protein bowl',
    'corporate lunch delivery', 'bulk meal orders', 'fast food pickup',
    'order food WhatsApp', 'Uber Eats burger', 'Mr D Food order',
    'fast casual dining', 'takeaway near me', 'smoked brisket',
    'ASD Cafe menu', 'pulled brisket pizza', 'halloumi wrap', 'cheese burger'
  ].join(', '),
  authors: [{ name: 'ASD Cafe' }],
  creator: 'ASD Cafe',
  publisher: 'ASD Cafe',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'ASD Cafe | Born Smoked. Served Fast.',
    description: 'Ghost kitchen serving 12-hour smoked brisket burgers, loaded fries, pizza & wings. Fast pickup in 15–20 mins. Order on WhatsApp, Uber Eats or Mr D.',
    type: 'website',
    url: SITE_URL,
    siteName: 'ASD Cafe',
    locale: 'en_ZA',
    images: [
      {
        url: '/images/burger_photo.png',
        width: 1200,
        height: 630,
        alt: 'ASD Cafe – Born Smoked. Served Fast.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASD Cafe | Born Smoked. Served Fast.',
    description: '12-hour smoked brisket. Loaded burgers. Napkins won\'t save you. Order in 60 seconds.',
    images: ['/images/burger_photo.png'],
  },
  icons: {
    icon: '/images/real_asd_logo.png',
    shortcut: '/images/real_asd_logo.png',
    apple: '/images/real_asd_logo.png',
  },
}

export default function RootLayout({ children }) {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "ASD Cafe",
    "alternateName": "African Spirits Distillery Cafe",
    "image": `${SITE_URL}/images/real_asd_logo.png`,
    "logo": `${SITE_URL}/images/real_asd_logo.png`,
    "description": "Born smoked, served fast. ASD Cafe is a ghost kitchen serving 12-hour smoked brisket burgers, pizza, wings, wraps and corporate lunch menus. Ready for pickup in 15–20 mins.",
    "url": SITE_URL,
    "telephone": "+27760578078",
    "email": "info@asdcafe.com",
    "priceRange": "R75–R135",
    "servesCuisine": ["Burgers", "Pizza", "Chicken Wings", "Wraps", "Salads", "Brisket"],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "hasMenu": `${SITE_URL}/#menu-start`,
    "menu": `${SITE_URL}/#menu-start`,
    "acceptsReservations": false,
    "paymentAccepted": "Cash, Card",
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://wa.me/27760578078?text=Hi%20ASD%20Cafe%2C%20I%E2%80%99d%20like%20to%20place%20an%20order.",
        "inLanguage": "en",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "deliveryMethod": [
        "http://purl.org/goodrelations/v1#DeliveryModePickUp"
      ]
    },
    "sameAs": [
      "https://www.ubereats.com",
      "https://www.mrdfood.com"
    ]
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
        {/* Local SEO geo tags */}
        <meta name="geo.region" content="ZA" />
        <meta name="geo.country" content="South Africa" />
        <meta name="language" content="en-ZA" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1591520225434949');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <img height="1" width="1" style={{display: 'none'}} src="https://www.facebook.com/tr?id=1591520225434949&ev=PageView&noscript=1" alt="" />
        </noscript>
        {children}
      </body>
    </html>
  )
}
