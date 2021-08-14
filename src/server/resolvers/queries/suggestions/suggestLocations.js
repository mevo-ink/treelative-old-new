import { Client } from '@googlemaps/google-maps-services-js'

export default async (parent, args, context, info) => {
  const client = new Client({})

  if (!args.query) return []

  const result = await client
    .placeAutocomplete({
      params: {
        input: args.query,
        key: process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY
      },
      timeout: 1000 // milliseconds
    })

  return result.data ? result.data.predictions : []
}
