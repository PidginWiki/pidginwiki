// Seed dictionary entries for the Pidgin.wiki demo.
// These are community-sourced, illustrative entries. The live dictionary is built
// from the curated corpus collected through Bandolo. Contributions are welcome.

export interface Sense {
  definition: string
  example?: string
  exampleEn?: string
}

export interface Variant {
  region: string
  form: string
  note?: string
}

export interface Word {
  slug: string
  headword: string
  pos: string
  respelling: string
  region: string
  senses: Sense[]
  synonyms?: string[]
  variants?: Variant[]
}

export const words: Word[] = [
  {
    slug: 'wahala',
    headword: 'wahala',
    pos: 'noun',
    respelling: 'wa-ha-la',
    region: 'General',
    senses: [
      {
        definition: 'Trouble; problem; difficulty.',
        example: 'No wahala, I go come tomorrow.',
        exampleEn: 'No problem, I will come tomorrow.',
      },
    ],
    synonyms: ['yawa', 'palava'],
    variants: [
      { region: 'Nigeria', form: 'wahala', note: 'Everyday word for trouble or stress. "No wahala" means no problem.' },
      { region: 'Cameroon', form: 'palava', note: 'Primary word for trouble, a quarrel, or fuss; "wahala" is also understood.' },
      { region: 'Ghana', form: 'wahala', note: 'Widely understood; "palava" is heard alongside it.' },
    ],
  },
  {
    slug: 'abeg',
    headword: 'abeg',
    pos: 'interjection',
    respelling: 'a-beg',
    region: 'General',
    senses: [
      {
        definition: 'Please; I beg you. Used to plead or to soften a request.',
        example: 'Abeg help me hold this one.',
        exampleEn: 'Please help me hold this one.',
      },
    ],
  },
  {
    slug: 'chop',
    headword: 'chop',
    pos: 'verb',
    respelling: 'chop',
    region: 'General',
    senses: [
      {
        definition: 'To eat.',
        example: 'Make we chop before we go.',
        exampleEn: 'Let us eat before we go.',
      },
      {
        definition: 'Food (as a noun).',
        example: 'The chop sweet well well.',
        exampleEn: 'The food is very tasty.',
      },
    ],
    variants: [
      { region: 'Nigeria', form: 'chop', note: 'To eat; "chop money" can also mean to spend or embezzle funds.' },
      { region: 'Cameroon', form: 'chop', note: 'To eat; "chop" also names the food itself.' },
      { region: 'Ghana', form: 'chop', note: 'To eat; a "chop bar" is a local eatery.' },
    ],
  },
  {
    slug: 'wetin',
    headword: 'wetin',
    pos: 'pronoun',
    respelling: 'we-tin',
    region: 'General',
    senses: [
      {
        definition: 'What.',
        example: 'Wetin dey happen?',
        exampleEn: 'What is happening?',
      },
    ],
  },
  {
    slug: 'sabi',
    headword: 'sabi',
    pos: 'verb',
    respelling: 'sa-bi',
    region: 'General',
    senses: [
      {
        definition: 'To know; to know how to do something.',
        example: 'I sabi drive motor.',
        exampleEn: 'I know how to drive a car.',
      },
    ],
  },
  {
    slug: 'oga',
    headword: 'oga',
    pos: 'noun',
    respelling: 'o-ga',
    region: 'Nigeria',
    senses: [
      {
        definition: 'Boss; master; a person in authority.',
        example: 'My oga never come office.',
        exampleEn: 'My boss has not come to the office.',
      },
    ],
  },
  {
    slug: 'pikin',
    headword: 'pikin',
    pos: 'noun',
    respelling: 'pi-kin',
    region: 'General',
    senses: [
      {
        definition: 'Child.',
        example: 'The pikin dey sleep.',
        exampleEn: 'The child is sleeping.',
      },
    ],
    variants: [
      { region: 'Nigeria', form: 'pikin', note: 'Child.' },
      { region: 'Cameroon', form: 'pikin', note: 'Child; "pikin dem" for children.' },
      { region: 'Sierra Leone', form: 'pikin', note: 'Child, in Krio.' },
    ],
  },
  {
    slug: 'comot',
    headword: 'comot',
    pos: 'verb',
    respelling: 'co-mot',
    region: 'General',
    senses: [
      {
        definition: 'To leave; to come out; to get out.',
        example: 'Comot for road!',
        exampleEn: 'Get out of the way!',
      },
    ],
  },
  {
    slug: 'gist',
    headword: 'gist',
    pos: 'noun, verb',
    respelling: 'gist',
    region: 'General',
    senses: [
      {
        definition: 'Chat, news, or gossip; to chat informally.',
        example: 'Come make I gist you wetin happen.',
        exampleEn: 'Come let me tell you what happened.',
      },
    ],
  },
  {
    slug: 'japa',
    headword: 'japa',
    pos: 'verb',
    respelling: 'ja-pa',
    region: 'Nigeria',
    senses: [
      {
        definition: 'To flee or run away; informally, to emigrate abroad.',
        example: 'Many youth wan japa go abroad.',
        exampleEn: 'Many young people want to emigrate abroad.',
      },
    ],
    variants: [
      { region: 'Nigeria', form: 'japa', note: 'To flee; now widely used for emigrating abroad.' },
      { region: 'Cameroon', form: 'fall bush', note: 'To flee or escape; also used for leaving the country.' },
    ],
  },
  {
    slug: 'waka',
    headword: 'waka',
    pos: 'verb',
    respelling: 'wa-ka',
    region: 'General',
    senses: [
      {
        definition: 'To walk; to go; to roam about.',
        example: 'I go waka reach there.',
        exampleEn: 'I will walk all the way there.',
      },
    ],
  },
  {
    slug: 'paddi',
    headword: 'paddi',
    pos: 'noun',
    respelling: 'pa-di',
    region: 'General',
    senses: [
      {
        definition: 'Friend. Often heard as "paddiman" for a close friend.',
        example: 'Him be my paddi from school.',
        exampleEn: 'He is my friend from school.',
      },
    ],
    synonyms: ['paddiman', 'guy'],
  },
  {
    slug: 'how-far',
    headword: 'how far',
    pos: 'greeting',
    respelling: 'how-far',
    region: 'General',
    senses: [
      {
        definition: 'A casual greeting: what is up? how are things?',
        example: 'How far, you dey alright?',
        exampleEn: 'What is up, are you alright?',
      },
    ],
  },
]

export function findWord(slug: string): Word | undefined {
  return words.find((w) => w.slug === slug)
}
