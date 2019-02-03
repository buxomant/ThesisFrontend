export interface WebsiteResponse {
    websiteId: number,
    url: string,
    type: string,
    contentType: string,
    fetchEveryNumberOfHours: number
}

export const WebsiteType = {
    DOMESTIC: 'DOMESTIC',
    FOREIGN: 'FOREIGN',
    REDIRECT: 'REDIRECT',
    INDEXING_SERVICE: 'INDEXING_SERVICE'
};

export const WebsiteContentType = {
    NEWS: 'NEWS',
    SOCIAL_MEDIA: 'SOCIAL_MEDIA',
    UNCATEGORIZED: 'UNCATEGORIZED'
};