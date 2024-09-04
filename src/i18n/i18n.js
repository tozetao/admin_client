import Vue from 'vue'
import VueI18n from 'vue-i18n'

import locale from 'element-ui/lib/locale'

import en from './langs/en'
import zh_CN from './langs/cn'

const messages = {
  en, zh_CN
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages
})
locale.i18n((key, value) => i18n.t(key, value))
export default i18n
