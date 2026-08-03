export const useSpotlight = () => {
    const { gsap } = useGsap()

    const initSpotlight = () => {
        const handleMouseMove = (e: MouseEvent) => {
            gsap.to(document.body, {
                '--mouse-x': `${e.clientX}px`,
                '--mouse-y': `${e.clientY}px`,
                duration: 0.8,
                ease: 'power2.out'
            })
        }

        onMounted(() => {
            window.addEventListener('mousemove', handleMouseMove)
        })

        onUnmounted(() => {
            window.removeEventListener('mousemove', handleMouseMove)
        })
    }

    return { initSpotlight }
}