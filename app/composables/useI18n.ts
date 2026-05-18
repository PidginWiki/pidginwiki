import { LOCALES, messages, type Locale } from '~/i18n/messages'

export function useLocale() {
  return useCookie<Locale>('pw_locale', {
    default: () => 'en',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })
}

export function useT() {
  const locale = useLocale()
  return (key: string): string => {
    const dict = messages[locale.value] ?? messages.en
    return dict[key] ?? messages.en[key] ?? key
  }
}

export function useLocales() {
  return LOCALES
}
