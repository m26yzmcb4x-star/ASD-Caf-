import './globals.css'
import Script from 'next/script'

const SITE_URL = 'https://asdcafe.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ASD Cafe | Street Heat. Fast Eats. | African Spirits Distillery',
  description: 'ASD Cafe – African Spirits Distillery Cafe. Ghost kitchen serving our famous 12-hour smoked brisket burgers, pizza, wings, wraps and corporate lunch menus. Order via WhatsApp, Uber Eats or Mr D. Fast pickup in 15–20 mins.',
  keywords: [
    'ASD Cafe', 'African Spirits Distillery', 'street food', 'burgers', 'brisket burger',
    'smoked brisket', 'pizza', 'chicken wings', 'wraps', 'takeaway', 'fast food',
    'ghost kitchen', 'lunch delivery', 'corporate lunch', 'loaded fries',
    'order food online', 'Uber Eats', 'Mr Delivery', 'WhatsApp order',
    'best burgers', 'South Africa food', 'fast casual dining'
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
    title: 'ASD Cafe | Street Heat. Fast Eats.',
    description: 'Ghost kitchen serving high-quality smoked brisket, bold flavors, and lightning-fast takeaway. Order via WhatsApp, Uber Eats or Mr D.',
    type: 'website',
    url: SITE_URL,
    siteName: 'ASD Cafe',
    locale: 'en_ZA',
    images: [
      {
        url: '/images/real_asd_logo.png',
        width: 800,
        height: 600,
        alt: 'ASD Cafe – Street Heat. Fast Eats.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASD Cafe | Street Heat. Fast Eats.',
    description: 'Smoked brisket. Loaded burgers. No waiting around. Order in 60 seconds.',
    images: ['/images/real_asd_logo.png'],
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
    "description": "Ghost kitchen serving high-quality smoked brisket burgers, pizza, wings, wraps and corporate lunch menus. Fast pickup in 15–20 mins.",
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
