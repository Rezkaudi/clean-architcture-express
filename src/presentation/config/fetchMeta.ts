import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchMeta = async (url: string) => {
    try {
        // Fetch the HTML content
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MetaFetcher/1.0)'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Helper function to get meta content
        const getMeta = (property: string) => {
            return $(`meta[property="${property}"]`).attr('content') ||
                $(`meta[name="${property}"]`).attr('content');
        };

        // Extract metadata
        const metadata = {
            title: $('title').text() || getMeta('og:title') || getMeta('twitter:title'),
            description: getMeta('description') || getMeta('og:description') || getMeta('twitter:description'),
            url: getMeta('og:url') || url,
            siteName: getMeta('og:site_name'),
            image: getMeta('og:image') || getMeta('twitter:image'),
            type: getMeta('og:type'),
            twitterCard: getMeta('twitter:card'),
            favicon: $('link[rel="icon"]').attr('href') ||
                $('link[rel="shortcut icon"]').attr('href') ||
                '/favicon.ico',
            // Additional common meta tags
            keywords: getMeta('keywords'),
            viewport: getMeta('viewport'),
            canonicalUrl: $('link[rel="canonical"]').attr('href'),
            // Raw Open Graph and Twitter Card data
            og: {
                title: getMeta('og:title'),
                description: getMeta('og:description'),
                url: getMeta('og:url'),
                site_name: getMeta('og:site_name'),
                image: getMeta('og:image'),
                type: getMeta('og:type')
            },
            twitter: {
                card: getMeta('twitter:card'),
                title: getMeta('twitter:title'),
                description: getMeta('twitter:description'),
                image: getMeta('twitter:image'),
                creator: getMeta('twitter:creator'),
                site: getMeta('twitter:site')
            }
        };

        console.log(metadata)
        return metadata;
    } catch (error) {
        console.error(`Error fetching the page: ${error}`);
        throw error;
    }
};