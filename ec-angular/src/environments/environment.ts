// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlEC: 'http://10.4.4.224:10022/api/',
  apiUrl: 'http://10.4.0.76:106/api/',
  hub: 'http://10.4.4.224:10022/ec-hub'
  // apiUrlEC: 'http://10.4.0.76:1002/api/',
  // apiUrl: 'http://10.4.0.76:106/api/',
  // hub: 'http://10.4.0.76:1002/ec-hub'
  // apiUrlEC: 'http://10.4.4.92:1002/api/',
  // apiUrl: 'http://10.4.0.76:106/api/',
  // hub: 'http://10.4.4.92:1002/ec-hub'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
