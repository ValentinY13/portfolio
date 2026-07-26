import * as z from "zod"
import type {$ZodRawIssue} from "zod/v4/core/errors";

async function loadLocale(locale: string) {
    let res;

    if (locale === 'fr') {
        res = await import('zod/v4/locales/fr.js');
    } else if (locale === 'nl') {
        res = await import('zod/v4/locales/nl.js');
    } else {
        res = await import('zod/v4/locales/en.js');
    }

    if(!res) return;

    const {localeError: _localeError} = res.default();

    const localeError = (issue: $ZodRawIssue) => {
        if (issue.code === "invalid_type" || issue.code === "invalid_value") {

            if (issue.input === undefined) {
                return "Ce champ est obligatoire";
            }

        } else if (issue.code === "too_big") {
            let size = issue.maximum;

            if(issue.origin === 'file') {
                size = issue.maximum / 1024 / 1024;
            }

            return `Ce champ doit avoir au maximum ${size} caractère(s)`;
        } else if (issue.code === "too_small") {
            let size = issue.minimum;
            if(issue.origin === 'file') {
                size = issue.minimum / 1024 / 1024;
            }
            return `Ce champ doit avoir au minimum ${size} caractère(s)`;
        }

        return _localeError(issue)
    };

    z.config({localeError});
}

export default defineNuxtPlugin({
    parallel: true,
    setup: async () => {
        await loadLocale('fr');
    }
})
