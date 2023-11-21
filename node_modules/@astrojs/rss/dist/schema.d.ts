import { z } from 'astro/zod';
export declare const rssSchema: z.ZodObject<{
    title: z.ZodString;
    pubDate: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate]>, Date, string | number | Date>, Date, string | number | Date>;
    description: z.ZodOptional<z.ZodString>;
    customData: z.ZodOptional<z.ZodString>;
    draft: z.ZodOptional<z.ZodBoolean>;
    categories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    author: z.ZodOptional<z.ZodString>;
    commentsUrl: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        title: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        url: string;
    }, {
        title: string;
        url: string;
    }>>;
    enclosure: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        length: z.ZodNumber;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        length: number;
        type: string;
        url: string;
    }, {
        length: number;
        type: string;
        url: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    customData?: string | undefined;
    draft?: boolean | undefined;
    categories?: string[] | undefined;
    author?: string | undefined;
    commentsUrl?: string | undefined;
    source?: {
        title: string;
        url: string;
    } | undefined;
    enclosure?: {
        length: number;
        type: string;
        url: string;
    } | undefined;
    title: string;
    pubDate: Date;
}, {
    description?: string | undefined;
    customData?: string | undefined;
    draft?: boolean | undefined;
    categories?: string[] | undefined;
    author?: string | undefined;
    commentsUrl?: string | undefined;
    source?: {
        title: string;
        url: string;
    } | undefined;
    enclosure?: {
        length: number;
        type: string;
        url: string;
    } | undefined;
    title: string;
    pubDate: string | number | Date;
}>;
