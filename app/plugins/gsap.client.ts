import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'

export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, MotionPathPlugin)
    }

    return {
        provide: {
            gsap,
            ScrollTrigger
        }
    }
})