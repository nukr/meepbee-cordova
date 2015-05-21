import { Parse } from 'parse';
import config from './config';
let {appId, restAPIKey, jsKey, clientKey} = config;
Parse.initialize(appId, jsKey);

export default Parse;
