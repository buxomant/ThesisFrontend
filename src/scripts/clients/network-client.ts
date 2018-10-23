import * as $ from 'jquery';
import * as Q from 'q';

import Promise = Q.Promise;
import {ConfigService} from 'scripts/services/config-service';
// import {ErrorType} from 'scripts/models/error-type';

export const CONTENT_TYPE_JSON = 'application/json';

export function makeGetRequest<T>(endpointPath: string, requestModifiers?: RequestModifiers): Promise<T> {
    const ajaxSettings: JQueryAjaxSettings = generateAjaxSettings(HttpMethod.GET, endpointPath, null, requestModifiers);
    return makeRequest<T>(ajaxSettings);
}

export function makePostRequest<T>(endpointPath: string, requestBody?: any, requestModifiers?: RequestModifiers): Promise<T> {
    const ajaxSettings: JQueryAjaxSettings = generateAjaxSettings(HttpMethod.POST, endpointPath, requestBody, requestModifiers);
    return makeRequest<T>(ajaxSettings);
}

export function makePutRequest<T>(endpointPath: string, requestBody?: any, requestModifiers?: RequestModifiers): Promise<T> {
    const ajaxSettings: JQueryAjaxSettings = generateAjaxSettings(HttpMethod.PUT, endpointPath, requestBody, requestModifiers);
    return makeRequest<T>(ajaxSettings);
}

export function makeDeleteRequest<T>(endpointPath: string, requestBody?: any, requestModifiers?: RequestModifiers): Promise<T> {
    const ajaxSettings: JQueryAjaxSettings = generateAjaxSettings(HttpMethod.DELETE, endpointPath, requestBody, requestModifiers);
    return makeRequest<T>(ajaxSettings);
}

function makeRequest<T>(ajaxSettings: JQueryAjaxSettings): Promise<T> {
    return Q.Promise<T>((resolve, reject) => {
        $.ajax(ajaxSettings)
            .done(resolve)
            .fail((errorResponse) => {
                reject(getNetworkError(errorResponse));
            });
    });
}

function generateAjaxSettings(
    httpMethod: HttpMethod,
    endpointPath: string,
    requestBody: any,
    requestModifiers: RequestModifiers,
): JQueryAjaxSettings {
    return {
        dataType: 'json',
        data: requestBody ? JSON.stringify(requestBody) : undefined,
        contentType: requestModifiers && requestModifiers.contentType ? requestModifiers.contentType : CONTENT_TYPE_JSON,
        type: HttpMethod.toString(httpMethod),
        url: ConfigService.getConfig().thesisBackendApi + endpointPath,
        processData: false
    };
}

function getNetworkError(errorResponse): NetworkError {
    return {
        statusCode: errorResponse.status,
        response: errorResponse.responseJSON
    };
}

export interface RequestModifiers {
    contentType?: string;
}

export interface NetworkError {
    statusCode: string;
    response: any;
}

// export function getErrorTypeForErrorResponse(errorResponse: NetworkError): ErrorType {
//     if (!errorResponse.response || !errorResponse.response.code) {
//         return ErrorType.GENERAL_ERROR;
//     }
//     return  _.includes(ErrorType.values(), errorResponse.response.code)
//         ? errorResponse.response.code
//         : ErrorType.GENERAL_ERROR;
// }

enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}

namespace HttpMethod {
    export function toString(httpMethod: HttpMethod) {
        switch (httpMethod) {
            case HttpMethod.GET:
                return 'GET';
            case HttpMethod.POST:
                return 'POST';
            case HttpMethod.PUT:
                return 'PUT';
            case HttpMethod.DELETE:
                return 'DELETE';
        }
    }
}
