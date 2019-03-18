export interface PageSimilarityResponse {
    similarityId: number;
    similarityCoefficient: number;
    firstPageId: number;
    secondPageId: number;
    firstWebsiteUrl: string;
    secondWebsiteUrl: string;
    firstPageUrl: string;
    secondPageUrl: string;
}
