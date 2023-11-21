import { z } from 'astro/zod';
import { rssSchema } from './schema.js';
export { rssSchema };
export type RSSOptions = {
    /** Title of the RSS Feed */
    title: z.infer<typeof rssOptionsValidator>['title'];
    /** Description of the RSS Feed */
    description: z.infer<typeof rssOptionsValidator>['description'];
    /**
     * Specify the base URL to use for RSS feed links.
     * We recommend using the [endpoint context object](https://docs.astro.build/en/reference/api-reference/#contextsite),
     * which includes the `site` configured in your project's `astro.config.*`
     */
    site: z.infer<typeof rssOptionsValidator>['site'] | URL;
    /** List of RSS feed items to render. */
    items: RSSFeedItem[] | GlobResult;
    /** Specify arbitrary metadata on opening <xml> tag */
    xmlns?: z.infer<typeof rssOptionsValidator>['xmlns'];
    /**
     * Specifies a local custom XSL stylesheet. Ex. '/public/custom-feed.xsl'
     */
    stylesheet?: z.infer<typeof rssOptionsValidator>['stylesheet'];
    /** Specify custom data in opening of file */
    customData?: z.infer<typeof rssOptionsValidator>['customData'];
    /**
     * Whether to include drafts or not
     * @deprecated Deprecated since version 3.0. Use content collections instead.
     */
    drafts?: z.infer<typeof rssOptionsValidator>['drafts'];
    trailingSlash?: z.infer<typeof rssOptionsValidator>['trailingSlash'];
};
export type RSSFeedItem = {
    /** Link to item */
    link: string;
    /** Full content of the item. Should be valid HTML */
    content?: string | undefined;
    /** Title of item */
    title: z.infer<typeof rssSchema>['title'];
    /** Publication date of item */
    pubDate: z.infer<typeof rssSchema>['pubDate'];
    /** Item description */
    description?: z.infer<typeof rssSchema>['description'];
    /** Append some other XML-valid data to this item */
    customData?: z.infer<typeof rssSchema>['customData'];
    /**
     * Whether draft or not
     * @deprecated Deprecated since version 3.0. Use content collections instead.
     */
    draft?: z.infer<typeof rssSchema>['draft'];
    /** Categories or tags related to the item */
    categories?: z.infer<typeof rssSchema>['categories'];
    /** The item author's email address */
    author?: z.infer<typeof rssSchema>['author'];
    /** A URL of a page for comments related to the item */
    commentsUrl?: z.infer<typeof rssSchema>['commentsUrl'];
    /** The RSS channel that the item came from */
    source?: z.infer<typeof rssSchema>['source'];
    /** A media object that belongs to the item */
    enclosure?: z.infer<typeof rssSchema>['enclosure'];
};
type ValidatedRSSFeedItem = z.infer<typeof rssFeedItemValidator>;
type GlobResult = z.infer<typeof globResultValidator>;
declare const rssFeedItemValidator: z.ZodObject<{
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
    link: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
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
    content?: string | undefined;
    title: string;
    pubDate: Date;
    link: string;
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
    content?: string | undefined;
    title: string;
    pubDate: string | number | Date;
    link: string;
}>;
declare const globResultValidator: z.ZodRecord<z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodPromise<z.ZodAny>>>;
declare const rssOptionsValidator: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    site: z.ZodEffects<z.ZodString, string, unknown>;
    items: z.ZodEffects<z.ZodUnion<[z.ZodArray<z.ZodObject<{
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
        link: z.ZodString;
        content: z.ZodOptional<z.ZodString>;
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
        content?: string | undefined;
        title: string;
        pubDate: Date;
        link: string;
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
        content?: string | undefined;
        title: string;
        pubDate: string | number | Date;
        link: string;
    }>, "many">, z.ZodRecord<z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodPromise<z.ZodAny>>>]>, {
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
        content?: string | undefined;
        title: string;
        pubDate: Date;
        link: string;
    }[], {
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
        content?: string | undefined;
        title: string;
        pubDate: string | number | Date;
        link: string;
    }[] | Record<string, (...args: unknown[]) => Promise<any>>>;
    xmlns: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    drafts: z.ZodDefault<z.ZodBoolean>;
    stylesheet: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodBoolean]>>;
    customData: z.ZodOptional<z.ZodString>;
    trailingSlash: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    customData?: string | undefined;
    xmlns?: Record<string, string> | undefined;
    stylesheet?: string | boolean | undefined;
    title: string;
    description: string;
    trailingSlash: boolean;
    site: string;
    items: {
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
        content?: string | undefined;
        title: string;
        pubDate: Date;
        link: string;
    }[];
    drafts: boolean;
}, {
    customData?: string | undefined;
    trailingSlash?: boolean | undefined;
    site?: unknown;
    xmlns?: Record<string, string> | undefined;
    drafts?: boolean | undefined;
    stylesheet?: string | boolean | undefined;
    title: string;
    description: string;
    items: {
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
        content?: string | undefined;
        title: string;
        pubDate: string | number | Date;
        link: string;
    }[] | Record<string, (...args: unknown[]) => Promise<any>>;
}>;
export default function getRssResponse(rssOptions: RSSOptions): Promise<Response>;
export declare function getRssString(rssOptions: RSSOptions): Promise<string>;
export declare function pagesGlobToRssItems(items: GlobResult): Promise<ValidatedRSSFeedItem[]>;
