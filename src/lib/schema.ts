/** Schema.org builders — only confirmed data from src/config is published. */
import { site } from '../config/site';
import { services } from '../config/services';
import { reviews } from '../config/reviews';
import { href, type Lang, type PageKey } from '../i18n/routes';
import { useT } from '../i18n';

export const abs = (path: string) => new URL(path, site.url).href;
export const salonId = abs('/#salon');
export const ogImage = abs('/og-image.jpg');

export function salonSchema(lang: Lang, heroImage?: string) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': salonId,
    name: site.name,
    description: useT(lang).seo.home.description,
    url: abs(href(lang, 'home')),
    telephone: site.phoneE164,
    image: [ogImage, ...(heroImage ? [heroImage] : [])],
    logo: abs('/icon-512.png'),
    address: {
      '@type': 'PostalAddress',
      ...(site.streetAddress ? { streetAddress: site.streetAddress[lang] } : {}),
      addressLocality: site.city[lang],
      addressCountry: 'GE',
    },
    areaServed: { '@type': 'City', name: site.city[lang] },
    sameAs: [site.facebook, site.instagram].filter(Boolean),
    currenciesAccepted: site.currency,
    knowsLanguage: ['ka', 'en'],
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name[lang], description: s.short[lang] },
      // Prices are only published once confirmed (site.pricesIndicative = false).
      ...(!site.pricesIndicative && s.price !== null
        ? { price: s.price, priceCurrency: site.currency }
        : {}),
    })),
  };
  if (site.geo) data.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng };
  if (site.hours) {
    data.openingHoursSpecification = site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (site.paymentMethods) data.paymentAccepted = site.paymentMethods[lang];
  if (reviews.length) {
    const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: +avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    };
    data.review = reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.text[lang],
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    }));
  }
  return data;
}

export function websiteSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs(`${href(lang, 'home')}#website`),
    url: abs(href(lang, 'home')),
    name: site.name,
    inLanguage: lang,
    publisher: { '@id': salonId },
  };
}

export function breadcrumbSchema(lang: Lang, page: PageKey) {
  const t = useT(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.nav.home, item: abs(href(lang, 'home')) },
      { '@type': 'ListItem', position: 2, name: t.nav[page], item: abs(href(lang, page)) },
    ],
  };
}

export function webPageSchema(lang: Lang, page: PageKey, type = 'WebPage') {
  const t = useT(lang);
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': abs(`${href(lang, page)}#webpage`),
    url: abs(href(lang, page)),
    name: t.seo[page === 'home' ? 'home' : page].title,
    description: t.seo[page === 'home' ? 'home' : page].description,
    inLanguage: lang,
    isPartOf: { '@id': abs(`${href(lang, 'home')}#website`) },
    about: { '@id': salonId },
  };
}
