import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_AUTOCOMPLETE_URL, GOOGLE_MAPS_PLACES_URL } from '@env';
import { AddressService } from 'reinvest-app-common/src/services/address';

export const addressService = new AddressService({
  apiKey: GOOGLE_MAPS_API_KEY,
  urls: { placeDetails: GOOGLE_MAPS_PLACES_URL, addressSuggestions: GOOGLE_MAPS_AUTOCOMPLETE_URL },
});
