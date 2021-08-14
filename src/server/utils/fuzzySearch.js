export default (query) => [
  { fullName: { $regex: query, $options: 'i' } },
  { shortName: { $regex: query, $options: 'i' } },
  { email: { $regex: query, $options: 'i' } },
  { phoneNumber: { $regex: query, $options: 'i' } },
  { 'birthLocation.suggested.description': { $regex: query, $options: 'i' } },
  { 'currentLocation.suggested.description': { $regex: query, $options: 'i' } }
]
