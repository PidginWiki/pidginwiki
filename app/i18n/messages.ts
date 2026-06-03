export type Locale = 'en' | 'pcm' | 'pcm-cm' | 'pcm-gh' | 'kri'

export interface LocaleMeta {
  code: Locale
  name: string
  note: string
  flag: string
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', name: 'English', note: '', flag: '🇬🇧' },
  { code: 'pcm', name: 'Naijá', note: 'Nigerian Pidgin', flag: '🇳🇬' },
  { code: 'pcm-cm', name: 'Cameroon Pidgin', note: 'Kontri tok', flag: '🇨🇲' },
  { code: 'pcm-gh', name: 'Ghanaian Pidgin', note: '', flag: '🇬🇭' },
  { code: 'kri', name: 'Krio', note: 'Sierra Leone', flag: '🇸🇱' },
]

type Dict = Record<string, string>

const en: Dict = {
  'nav.dictionary': 'Dictionary',
  'nav.translator': 'Translator',
  'nav.contribute': 'Contribute',
  'nav.volunteer': 'Volunteer',
  'nav.docs': 'Docs',

  'hero.title1': 'Sabi Pidgin.',
  'hero.title2': 'Free for everybody.',
  'hero.subtitle':
    'The open dictionary and translator for West African Pidgin English, spoken by over 100 million people across Nigeria, Cameroon, Ghana, and beyond.',
  'hero.searchPlaceholder': 'Search a word, e.g. wahala',
  'hero.try': 'Try:',
  'hero.searchBtn': 'Search dictionary',
  'hero.translatorBtn': 'Translator',

  'wotd.label': 'Word of the day',
  'wotd.seeEntry': 'See full entry',
  'explore.title': 'Explore words',
  'explore.viewAll': 'View all',
  'how.title': 'How Pidgin Wiki works',
  'how.sub': 'A community loop that turns everyday Pidgin into open language technology.',
  'how.step1.t': 'People share',
  'how.step1.d': 'Speakers chat with Bandolo and add words, meanings, and examples.',
  'how.step2.t': 'Langwa learns',
  'how.step2.d': 'The contributions train an open translation model for Pidgin and English.',
  'how.step3.t': 'Everyone uses',
  'how.step3.d': 'The dictionary and translator are free and open for all 100M+ speakers.',
  'regions.title': 'Spoken across West Africa',
  'regions.sub':
    'From Lagos to Buea to Accra, Pidgin is a shared tongue. The dictionary records how words shift between regions instead of flattening them.',
  'cta.title': 'Sabi Pidgin? Help build am.',
  'cta.sub': 'Every word you add becomes part of an openly licensed corpus that anyone can use.',
  'cta.btn': 'Contribute a word',

  'footer.tagline':
    'A free, open reference for West African Pidgin English. Built by the community, for over 100 million speakers.',
  'footer.explore': 'Explore',
  'footer.project': 'Project',
}

// Naijá (Nigerian Pidgin) translation of the interface.
const pcm: Dict = {
  'nav.dictionary': 'Dictionary',
  'nav.translator': 'Translator',
  'nav.contribute': 'Contribute',
  'nav.volunteer': 'Volunteer',
  'nav.docs': 'Docs',

  'hero.title1': 'Sabi Pidgin.',
  'hero.title2': 'E free for everybody.',
  'hero.subtitle':
    'Free dictionary and translator for West African Pidgin wey over 100 million people dey speak for Nigeria, Cameroon, Ghana, and beyond.',
  'hero.searchPlaceholder': 'Find word, like wahala',
  'hero.try': 'Try am:',
  'hero.searchBtn': 'Find for dictionary',
  'hero.translatorBtn': 'Translator',

  'wotd.label': 'Word for today',
  'wotd.seeEntry': 'See the full word',
  'explore.title': 'Check some words',
  'explore.viewAll': 'See all',
  'how.title': 'How Pidgin Wiki dey work',
  'how.sub': 'Na community loop wey dey turn everyday Pidgin into open language technology.',
  'how.step1.t': 'People dey share',
  'how.step1.d': 'People wey sabi Pidgin dey chat Bandolo, dey add word, meaning, and example.',
  'how.step2.t': 'Langwa dey learn',
  'how.step2.d': 'Wetin people add dey train open translation model for Pidgin and English.',
  'how.step3.t': 'Everybody dey use am',
  'how.step3.d': 'The dictionary and translator dey free and open for all 100M+ people wey dey speak am.',
  'regions.title': 'Dem dey speak am all over West Africa',
  'regions.sub':
    'From Lagos go Buea reach Accra, Pidgin na one tongue wey we dey share. The dictionary dey keep how word dey change for different place, e no dey flatten am.',
  'cta.title': 'You sabi Pidgin? Help build am.',
  'cta.sub': 'Every word wey you add go enter open corpus wey anybody fit use.',
  'cta.btn': 'Add one word',

  'footer.tagline':
    'Free, open reference for West African Pidgin English. Community build am, for over 100 million people wey dey speak am.',
  'footer.explore': 'Check',
  'footer.project': 'Project',
}

// Other variants start from English and will be filled in by the community.
export const messages: Record<Locale, Dict> = {
  en,
  pcm,
  'pcm-cm': { ...en },
  'pcm-gh': { ...en },
  kri: { ...en },
}
