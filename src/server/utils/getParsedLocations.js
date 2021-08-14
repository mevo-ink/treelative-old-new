import fetch from 'node-fetch'

const locationKeys = ['birthLocation', 'currentLocation', 'marriageLocation', 'deathLocation']

export default async (input) => {
  const parsedLocations = {}
  for (const field of Object.keys(input)) {
    if (locationKeys.includes(field)) {
      const suggestedLocation = input[field]
      if (suggestedLocation) {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestedLocation.place_id}&fields=formatted_address,geometry,address_component,url&key=${process.env.GOOGLE_LOCATION_API_KEY}`
        const response = await fetch(url)
        const getParsedLocation = await response.json()
        parsedLocations[field] = { parsed: getParsedLocation.result, suggested: suggestedLocation }
      }
    }
  }
  return parsedLocations
}
