import { vSplitText } from '~/directives/splitText'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('split-text', vSplitText)
})
