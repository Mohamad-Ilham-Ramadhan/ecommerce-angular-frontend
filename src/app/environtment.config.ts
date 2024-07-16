import { Injectable, InjectionToken} from '@angular/core';

export interface AppConfig {
   apiEndpoint: string
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG_VALUE = {
   apiEndpoint: 'http://localhost:3000/api'
}
