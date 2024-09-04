import i18n from '@/i18n/i18n'

// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)
    return translatedTitle
  }
  return title
}

export function translate(key) {
  const hasKey = i18n.te(key)
  if (hasKey) {
    return i18n.t(key)
  }
  return key
}
