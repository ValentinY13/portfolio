import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'

export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)
    }

    return {
        provide: {
            gsap,
            ScrollTrigger
        }
    }
})