/* global config */

declare const config: Config;

export class ConfigService {
    public static getConfig(): Config {
        return config;
    }
}

interface Config {
    thesisBackendApi: string;
}
