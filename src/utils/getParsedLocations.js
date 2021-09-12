import fetch from 'node-fetch'

const locationKeys = ['birthLocation', 'currentLocation', 'marriageLocation', 'deathLocation']

export default async (input) => {
  const parsedLocations = {}
  for (const field of Object.keys(input)) {
    if (locationKeys.includes(field)) {
      const suggestedLocation = input[field]
      if (suggestedLocation) {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestedLocation.place_id}&fields=formatted_address,geometry,address_component,url&key=${process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY}`
        const response = await fetch(url)
        const parsedLocation = (await response.json()).result
        const { lat, lng } = parsedLocation.geometry.location
        const country = parsedLocation.address_components.find(({ types }) => types.includes('country'))

        parsedLocations[field] = {
          fullDescription: parsedLocation.formatted_address,
          description: suggestedLocation.terms?.slice(-3).map(val => val.value).join(', '),
          lat,
          lng,
          placeID: suggestedLocation.place_id,
          country: country.long_name,
          code: country.short_name,
          mapURL: parsedLocation.url,
          imageURL: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=230x200&key=${process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY}`
        }
      }
    }
  }
  return parsedLocations
}
