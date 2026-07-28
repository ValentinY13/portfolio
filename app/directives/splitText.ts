export const vSplitText = {
    mounted(el: HTMLElement) {
        const text = (el.textContent || '').trim().replace(/\s+/g, ' ')

        el.innerHTML = ''

        const words = text.split(' ')

        words.forEach((word, i) => {
            if (word.length > 0) {
                const span = document.createElement('span')
                span.textContent = word + (i < words.length - 1 ? '\u00A0' : '')
                span.className = 'split-word inline-block opacity-0 translate-y-2'
                el.appendChild(span)
            }
        })
    }
}