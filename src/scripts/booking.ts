/**
 * Booking form → pre-filled WhatsApp message.
 * Nothing is sent to a server; the appointment is confirmed only when the
 * salon replies on WhatsApp.
 */
type Strings = {
  lang: 'ka' | 'en';
  errors: Record<'required' | 'name' | 'phone' | 'date' | 'time' | 'service' | 'summary', string>;
  message: Record<'greeting' | 'parent' | 'child' | 'age' | 'phone' | 'service' | 'date' | 'time' | 'note', string>;
};

const DRAFT_KEY = 'ks-booking-draft';

// Explicit Georgian names — browser Intl data for "ka" is not available everywhere.
const KA_DAYS = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
const KA_MONTHS = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];

function formatDate(iso: string, lang: 'ka' | 'en') {
  const d = new Date(`${iso}T12:00:00`);
  if (lang === 'ka') return `${KA_DAYS[d.getDay()]}, ${d.getDate()} ${KA_MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export function validPhone(value: string) {
  const v = value.trim();
  const digits = v.replace(/\D/g, '');
  if (digits.length === 9) return true; // local Georgian number, e.g. 595 12 34 56
  if (digits.startsWith('995') && digits.length === 12) return true; // +995 …
  return v.startsWith('+') && digits.length >= 8 && digits.length <= 15; // other countries
}

export function initBooking() {
  const form = document.querySelector<HTMLFormElement>('form[data-booking]');
  if (!form) return;
  const s: Strings = JSON.parse(form.dataset.strings!);
  const waNumber = form.dataset.wa!;
  const summary = form.querySelector<HTMLElement>('[data-form-summary]')!;
  const success = document.querySelector<HTMLElement>('[data-booking-success]')!;
  const waLink = success.querySelector<HTMLAnchorElement>('[data-wa-link]')!;
  const againBtn = success.querySelector<HTMLButtonElement>('[data-booking-again]')!;
  const date = form.elements.namedItem('date') as HTMLInputElement;
  const service = form.elements.namedItem('service') as HTMLSelectElement;
  date.min = todayISO();

  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]')];

  // ── restore draft (e.g. after switching language) + ?service= preselect ──
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? '{}');
    for (const f of fields) if (draft[f.name] && !f.value) f.value = draft[f.name];
  } catch {}
  const wanted = new URLSearchParams(location.search).get('service');
  if (wanted && [...service.options].some((o) => o.value === wanted)) service.value = wanted;

  const saveDraft = () => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(Object.fromEntries(fields.map((f) => [f.name, f.value]))));
    } catch {}
  };

  const check = (f: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string => {
    const v = f.value.trim();
    if (f.required && !v) {
      if (f.name === 'service') return s.errors.service;
      if (f.name === 'time') return s.errors.time;
      return s.errors.required;
    }
    if (!v) return '';
    if ((f.name === 'parent' || f.name === 'child') && v.replace(/[\s.'-]/g, '').length < 2) return s.errors.name;
    if (f.name === 'phone' && !validPhone(v)) return s.errors.phone;
    if (f.name === 'date' && v < todayISO()) return s.errors.date;
    return '';
  };

  const show = (f: HTMLElement & { name: string }, msg: string) => {
    const err = document.getElementById(`${f.id}-error`);
    if (err) err.textContent = msg;
    if (msg) f.setAttribute('aria-invalid', 'true');
    else f.removeAttribute('aria-invalid');
    f.closest('.field')?.classList.toggle('is-invalid', !!msg);
  };

  for (const f of fields) {
    f.addEventListener('blur', () => {
      if (f.value || f.dataset.touched) show(f, check(f));
      f.dataset.touched = '1';
    });
    f.addEventListener('input', () => {
      saveDraft();
      if (f.getAttribute('aria-invalid')) show(f, check(f));
    });
    f.addEventListener('change', saveDraft);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstBad: HTMLElement | null = null;
    for (const f of fields) {
      const msg = check(f);
      show(f, msg);
      if (msg && !firstBad) firstBad = f;
    }
    if (firstBad) {
      summary.textContent = s.errors.summary;
      summary.hidden = false;
      (firstBad as HTMLElement).focus();
      return;
    }
    summary.hidden = true;
    summary.textContent = '';

    const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    const niceDate = formatDate(val('date'), s.lang);
    const m = s.message;
    const age = val('age');
    const note = val('message');
    // Same layout as the salon's template; optional fields only appear when filled in.
    const lines = [
      m.greeting,
      '',
      `${m.parent}: ${val('parent')}`,
      `${m.child}: ${val('child')}`,
      ...(age ? [`${m.age}: ${age}`] : []),
      `${m.phone}: ${val('phone')}`,
      `${m.service}: ${service.selectedOptions[0]?.dataset.name ?? val('service')}`,
      `${m.date}: ${niceDate}`,
      `${m.time}: ${val('time')}`,
      ...(note ? [`${m.note}: ${note}`] : []),
    ];
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    waLink.href = url;

    // New tab: WhatsApp app on phones, WhatsApp Web / Desktop on computers.
    // If the browser blocks the new tab, go to WhatsApp in this tab instead.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;

    form.hidden = true;
    success.hidden = false;
    success.querySelector<HTMLElement>('[data-success-title]')?.focus();
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
  });

  againBtn.addEventListener('click', () => {
    form.reset();
    fields.forEach((f) => {
      delete f.dataset.touched;
      show(f, '');
    });
    date.min = todayISO();
    success.hidden = true;
    form.hidden = false;
    (form.elements.namedItem('parent') as HTMLInputElement).focus();
  });
}
