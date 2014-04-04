
/**
 * Module dependencies.
 */

var autoschema = require('..');

var obj = { action: 'Track',
  context:
   { library: 'analytics-android',
     libraryVersion: '0.4.3',
     telephony: { radio: 'gsm', carrier: 'STC' },
     wifi: { connected: true, available: true },
     providers:
      { Tapstream: false,
        Amplitude: false,
        Localytics: false,
        Flurry: false,
        Countly: false,
        Bugsnag: false,
        Quantcast: false,
        Crittercism: false,
        'Google Analytics': false,
        Omniture: false,
        Mixpanel: false },
     location: {},
     locale:
      { carrier: 'STC',
        language: 'العربية',
        country: 'الإمارات العربية المتحدة' },
     device:
      { brand: 'samsung',
        release: '4.3',
        manufacturer: 'samsung',
        sdk: 18 },
     display:
      { density: 3,
        width: 1080,
        height: 1920 },
     build: { name: '0.8.0', code: 89 },
     ip: '94.98.6.232' },
  timestamp: '2014-04-04T17:13:37.153Z',
  properties: {},
  event: 'Started App',
  userId: '523560ffc0e872392f000020',
  projectId: '7lcmjq8gbj',
  requestTime: '2014-04-04T17:13:37.153Z',
  version: 1,
  channel: 'server' }

var schema = autoschema(obj);

console.log(schema);