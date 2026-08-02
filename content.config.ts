import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        projects: defineCollection({
            type: 'page',
            source: 'projects/*.md',
            schema: z.object({
                title: z.string(),
                tldr: z.string(),
                type: z.string(),
                date: z.string(),
                status: z.enum(['Production', 'Internal', 'In Progress', 'MVP']),
                slug: z.string(),
                description: z.string(),
                architecture: z.string(),
                stack: z.array(z.object({
                    name: z.string(),
                    theme: z.enum(['accent', 'white'])
                })),
                context: z.string(),
                mission: z.string(),
                sections: z.array(z.object({
                    title: z.string(),
                    items: z.array(z.string())
                })),
                results: z.object({
                    challenge: z.string(),
                    outcome: z.string()
                }),
                preview_image: z.string(),
                images: z.array(z.object({
                    src: z.string(),
                    alt: z.string(),
                    caption: z.string()
                })),
                next_project: z.string().optional()
            })
        })
    }
})