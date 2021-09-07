export default (query) => [
  { fullName: { $regex: query, $options: 'i' } },
  { shortName: { $regex: query, $options: 'i' } },
  { email: { $regex: query, $options: 'i' } },
  { phoneNumber: { $regex: query, $options: 'i' } },
  { 'birthLocation.description': { $regex: query, $options: 'i' } },
  { 'currentLocation.description': { $regex: query, $options: 'i' } }
]
