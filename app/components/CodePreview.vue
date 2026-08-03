<script setup lang="ts">
const codeTabs = [
  {
    id: 'middleware',
    label: 'auth.global.ts',
    language: 'typescript',
    code: `export default defineNuxtRouteMiddleware((to) => {
  const { $directus } = useNuxtApp()
  const user = useDirectusUser()

  if (to.path.startsWith('/admin') && !user.value) {
    return navigateTo('/login', {
      replace: true,
      query: { redirect: to.fullPath }
    })
  }
})`
  },
  {
    id: 'composable',
    label: 'useApi.ts',
    language: 'typescript',
    code: `export const useApi = () => {
  const { getItems } = useDirectusItems()

  const fetchCollection = async <T>(
    collection: string,
    options: object = {}
  ): Promise<T[]> => {
    try {
      return await getItems<T>({
        collection,
        params: { ...options, cache: true }
      })
    } catch (error) {
      console.error(\`[API Error \${collection}]:\`, error)
      throw error
    }
  }

  return { fetchCollection }
}`
  }
]

const activeTab = ref(codeTabs[0])
const isCopied = ref(false)
const tabsRef = ref<HTMLElement[] | null>([])

const copyCode = async () => {
  await navigator.clipboard.writeText(activeTab.value!.code)
  isCopied.value = true
  setTimeout(() => isCopied.value = false, 1500)
}

const handleKeyDown = (e: KeyboardEvent, index: number) => {
  const diff = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (diff !== 0) {
    const nextIndex = (index + diff + codeTabs.length) % codeTabs.length
    activeTab.value = codeTabs[nextIndex]
    nextTick(() => tabsRef.value?.[nextIndex]?.focus())
  }
}

const highlight = (code: string) => {
  const tokens = [
    { type: 'comment', regex: /\/\/.*/ },
    { type: 'string', regex: /'.*?'|".*?"|`.*?`/ },
    { type: 'keyword', regex: /\b(export default|defineNuxtRouteMiddleware|const|return|if|await|async|throw|try|catch|import|from|export|interface|type)\b/ },
    { type: 'bracket', regex: /[{}\[\]()]/ },
    { type: 'function', regex: /\b\w+(?=\()/ }
  ]

  const combinedRegex = new RegExp(tokens.map(t => `(${t.regex.source})`).join('|'), 'g')

  return code.replace(combinedRegex, (match, ...groups) => {
    const groupIndex = groups.findIndex(g => g === match)
    const token = tokens[groupIndex]
    if (!token) return match

    const classes = {
      comment: 'text-white-100/30 italic',
      string: 'text-accent opacity-90',
      keyword: 'text-accent',
      bracket: 'text-grey-100/60',
      function: 'text-white-100 opacity-80'
    }

    return `<span class="${classes[token.type as keyof typeof classes]}">${match}</span>`
  })
}

const highlightedLines = computed(() => {
  return activeTab?.value?.code.split('\n').map(line => highlight(line))
})
</script>

<template>
  <div class="code-preview-box bg-white/3 border border-white/10 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
    <!-- Header -->
    <div class="flex items-center justify-between h-10 px-4 border-b border-white/10" role="tablist">
      <div class="flex gap-4 h-full">
        <button
            v-for="(tab, index) in codeTabs"
            :key="tab.id"
            ref="tabsRef"
            role="tab"
            :aria-selected="activeTab?.id === tab.id"
            :tabindex="activeTab?.id === tab.id ? 0 : -1"
            class="relative h-full text-xs font-jetbrains-mono transition-all duration-200 outline-none"
            :class="activeTab?.id === tab.id ? 'text-accent' : 'text-grey-100 hover:text-white-100'"
            @click="activeTab = tab"
            @keydown="handleKeyDown($event, index)"
        >
          {{ tab.label }}
          <span v-if="activeTab?.id === tab.id" class="absolute bottom-0 left-0 w-full h-px bg-accent" />
        </button>
      </div>

      <button @click="copyCode" class="text-grey-100 hover:text-accent transition-colors" aria-label="Copier">
        <span v-if="isCopied" class="text-[10px] font-jetbrains-mono text-accent">Copié !</span>
        <i v-else class="icon icon-copy text-sm"/>
      </button>
    </div>

    <div class="code-content-wrapper overflow-x-auto">
      <Transition
          enter-active-class="transition-opacity duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
      >
        <div
            :key="activeTab.id"
            class="p-6 font-jetbrains-mono text-sm leading-[1.6]"
        >
          <table class="w-full border-collapse">
            <tbody>
            <tr v-for="(line, idx) in highlightedLines" :key="idx" class="group">
              <td class="pr-6 text-white-100/20 text-right select-none w-8 group-hover:text-white-100/40 transition-colors">
                {{ idx + 1 }}
              </td>
              <td class="whitespace-pre text-grey-100" v-html="line"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.code-preview-box {
  --scrollbar-track: transparent;
}

.code-content-wrapper::-webkit-scrollbar { height: 4px; }
.code-content-wrapper::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
.code-content-wrapper::-webkit-scrollbar-thumb:hover { background: var(--color-accent); }


.whitespace-pre {
  white-space: pre;
}
</style>