import Config from 'react-native-config';
import { AddressService } from 'reinvest-app-common/src/services/address';

export const addressService = new AddressService({
  apiKey: Config.GOOGLE_MAPS_API_KEY,
  urls: { placeDetails: Config.GOOGLE_MAPS_PLACES_URL, addressSuggestions: Config.GOOGLE_MAPS_AUTOCOMPLETE_URL },
});
