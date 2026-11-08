/**
 * ─────────────────────────────────────────────────────────────
 *  SERVICES & PRICES (edit this file)
 * ─────────────────────────────────────────────────────────────
 * The prices below are EDITABLE SAMPLES — they are not confirmed by the
 * salon. While `site.pricesIndicative` is true, the website labels them as
 * indicative. Replace them with real prices and set it to false.
 *
 * `id` is used in booking links (/booking/?service=<id>) — keep it URL-safe.
 */
import type { Localized } from './site';

export type ServiceIcon = 'sparkle' | 'scissors' | 'comb' | 'bow' | 'star' | 'fringe' | 'heart';
export type ServiceTone = 'sun' | 'sky' | 'pink' | 'cream';

export interface Service {
  id: string;
  name: Localized;
  short: Localized;
  description: Localized;
  /** Price in GEL. null → "price on request" */
  price: number | null;
  /** Age guidance shown as a tag */
  age: Localized;
  icon: ServiceIcon;
  tone: ServiceTone;
  /** Shown on the homepage */
  featured?: boolean;
  /** Optional photo path (without extension) inside src/assets/photos */
  photo?: string;
}

export const services: Service[] = [
  {
    id: 'first-haircut',
    name: { ka: 'პირველი შეჭრა', en: 'First Haircut' },
    short: {
      ka: 'ნაზი, მშვიდი და დაუვიწყარი პირველი შეხვედრა მაკრატელთან.',
      en: 'A gentle, calm and memorable first meeting with the scissors.',
    },
    description: {
      ka: 'პირველი შეჭრა განსაკუთრებული მომენტია მთელი ოჯახისთვის. ვმუშაობთ ნელა, ვაძლევთ პატარას დრო გარემოსთან შესაგუებლად და მშობელს ყოველთვის ახლოს ვტოვებთ.',
      en: 'A first haircut is a special moment for the whole family. We work slowly, give your little one time to settle in, and keep you close the whole time.',
    },
    price: 25,
    age: { ka: '0–3 წელი', en: 'Ages 0–3' },
    icon: 'sparkle',
    tone: 'cream',
    featured: true,
    photo: 'portfolio/stylist-cutting-toddler-hair',
  },
  {
    id: 'kids-haircut',
    name: { ka: 'ბავშვის თმის შეჭრა', en: "Children's Haircut" },
    short: {
      ka: 'კლასიკური ან თანამედროვე შეჭრა, მორგებული თმის ტიპსა და ხასიათზე.',
      en: "A classic or modern cut, tailored to your child's hair and personality.",
    },
    description: {
      ka: 'ჯერ ვსაუბრობთ — რა მოსწონს ბავშვს, რა არის მოსახერხებელი მშობლისთვის — შემდეგ კი ვქმნით ფორმას, რომელიც ლამაზად იზრდება და ადვილად ივარცხნება.',
      en: "We talk first — what your child likes and what's practical for you — then shape a cut that grows out beautifully and is easy to style.",
    },
    price: 25,
    age: { ka: '3–12 წელი', en: 'Ages 3–12' },
    icon: 'scissors',
    tone: 'sun',
    featured: true,
    photo: 'portfolio/happy-boy-thumbs-up-car-chair',
  },
  {
    id: 'boys-style',
    name: { ka: 'ბიჭის მოდური შეჭრა', en: "Boys' Style Cut" },
    short: {
      ka: 'მანქანით და მაკრატლით — მოკლე გვერდები, ტექსტურა და სუფთა ხაზები.',
      en: 'Clippers and scissors — short sides, texture and clean lines.',
    },
    description: {
      ka: 'თანამედროვე ბიჭური ვარცხნილობები: გრადიენტი, ტექსტურირებული ზედა ნაწილი ან კლასიკური გვერდზე გადავარცხნა. მანქანის ხმასაც ნელ-ნელა ვაცნობთ.',
      en: 'Modern boys’ styles: a soft fade, a textured top or a classic side part. We introduce the sound of the clippers slowly, so nothing feels sudden.',
    },
    price: 30,
    age: { ka: '3+ წელი', en: 'Ages 3+' },
    icon: 'comb',
    tone: 'sky',
    featured: true,
    photo: 'portfolio/boy-textured-quiff-haircut',
  },
  {
    id: 'girls-haircut',
    name: { ka: 'გოგონას შეჭრა', en: "Girls' Haircut" },
    short: {
      ka: 'ბობი, ფენებიანი გრძელი თმა ან უბრალოდ ბოლოების გასწორება.',
      en: 'A bob, soft long layers or simply a tidy trim of the ends.',
    },
    description: {
      ka: 'ვინარჩუნებთ სიგრძეს, როცა ეს მნიშვნელოვანია, და ვქმნით ფორმას, რომელიც დილის ვარცხნას მარტივს ხდის — მშობლისთვისაც და ბავშვისთვისაც.',
      en: 'We keep the length when it matters and create a shape that makes morning brushing easy — for both parent and child.',
    },
    price: 30,
    age: { ka: '3+ წელი', en: 'Ages 3+' },
    icon: 'bow',
    tone: 'pink',
    featured: true,
    photo: 'portfolio/girl-in-salon-chair-updo',
  },
  {
    id: 'festive-hairstyle',
    name: { ka: 'სადღესასწაულო ვარცხნილობა', en: 'Festive Hairstyle' },
    short: {
      ka: 'გლუვი კონა, აქსესუარები და ნამდვილი პრინცესის განწყობა.',
      en: 'A sleek bun, pretty hair pins and a true little-princess mood.',
    },
    description: {
      ka: 'დაბადების დღისთვის, ცეკვისთვის, ფოტოსესიისთვის ან უბრალოდ სიხარულისთვის — ვქმნით ნაზ, მყარ ვარცხნილობას, რომელიც მთელი დღე ლამაზად ჩანს.',
      en: 'For a birthday, a dance recital, a photo session or just for joy — a gentle, secure style that stays beautiful all day.',
    },
    price: 40,
    age: { ka: '3+ წელი', en: 'Ages 3+' },
    icon: 'heart',
    tone: 'pink',
    photo: 'portfolio/festive-bun-with-pearl-pins',
  },
  {
    id: 'fringe-trim',
    name: { ka: 'ჩოლკის გასწორება', en: 'Fringe Trim' },
    short: {
      ka: 'სწრაფი ვიზიტი, როცა ჩოლკა თვალებში ხვდება.',
      en: 'A quick visit for when the fringe starts reaching the eyes.',
    },
    description: {
      ka: 'მოკლე, მშვიდი ვიზიტი ჩოლკის ან სახის ირგვლივ თმის გასასწორებლად — იდეალურია შეჭრებს შორის.',
      en: 'A short, calm visit to tidy the fringe or the hair around the face — perfect between full haircuts.',
    },
    price: 10,
    age: { ka: 'ყველა ასაკი', en: 'All ages' },
    icon: 'fringe',
    tone: 'cream',
    photo: 'portfolio/little-girl-curls-salon',
  },
  {
    id: 'teen-haircut',
    name: { ka: 'მოზარდის შეჭრა', en: 'Teen Haircut' },
    short: {
      ka: 'სტილი, რომელიც მოზარდს თავად აურჩევია — ჩვენ კი ვეხმარებით.',
      en: 'A style teens choose for themselves — with a little expert help.',
    },
    description: {
      ka: 'მოზარდისთვის ვარცხნილობა თვითგამოხატვაა. ვუსმენთ მის იდეებს, ვურჩევთ რა მოუხდება და ვასწავლით, როგორ მოუაროს სახლში.',
      en: 'For teens, a haircut is self-expression. We listen to their ideas, suggest what will suit them and show how to style it at home.',
    },
    price: 35,
    age: { ka: '12+ წელი', en: 'Ages 12+' },
    icon: 'star',
    tone: 'sun',
    photo: 'portfolio/red-haired-boy-haircut',
  },
];

export const serviceById = (id: string | null | undefined) => services.find((s) => s.id === id);
