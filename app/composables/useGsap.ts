export const useGsap = () => {
    const { $gsap } = useNuxtApp()

    /**
     * Crée un contexte GSAP lié au cycle de vie du composant
     */
    const createCtx = (el: HTMLElement | Ref<HTMLElement | null>, fn: gsap.ContextFunc) => {
        const target = unref(el)
        const actualTarget = (target && '$el' in target) ? target.$el : target

        if (!actualTarget) return

        const ctx = $gsap.context(fn, actualTarget)
        onUnmounted(() => ctx.revert())
        return ctx
    }

    /**
     * Utilitaire pour les animations de terminal (typing)
     */
    const typeText = (tl: gsap.core.Timeline, target: string | HTMLElement, text: string, options = {}) => {
        return tl.to(target, {
            text: { value: text },
            duration: 1.2,
            ease: "none",
            ...options
        })
    }

    return {
        createCtx,
        typeText,
        gsap: $gsap
    }
}