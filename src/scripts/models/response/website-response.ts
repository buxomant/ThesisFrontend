export interface WebsiteResponse {
    url: string,
    type: WebsiteType,
    contentType: WebsiteContentType,
    fetchEveryNumberOfHours: number
}

export enum WebsiteType {
    DOMESTIC,
    FOREIGN,
    REDIRECT_TO_FOREIGN,
    INDEXING_SERVICE
}

export enum WebsiteContentType {
    NEWS,
    SOCIAL_MEDIA,
    UNCATEGORIZED
}