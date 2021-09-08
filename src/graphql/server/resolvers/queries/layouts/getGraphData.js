import dbConnect from 'utils/mongodb'

export const getGraphData = async () => {
  const db = await dbConnect()

  const cacheKey = 'graph-layout'
  const cache = await db.collection('cache').findOne({ name: cacheKey })
  if (cache) return cache.data

  const users = await db
    .collection('users')
    .find()
    .project({ shortName: 1, fullName: 1, partner: 1, children: 1 })
    .toArray()

  const nodeUsers = users.map(user => ({
    id: user._id.toString(),
    label: user.shortName,
    group: 'individual',
    image: `${process.env.STORAGE_ENDPOINT}/avatars/${user._id.toString()}.png`,
    brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }))

  const couplesMap = {}
  for (const user of users) {
    if (user.partner) {
      const coupleID = [user._id.toString(), user.partner.toString()].sort().join('-')
      if (!couplesMap[coupleID]) {
        const coupleOneChildIDs = user.children?.map(child => child.toString()) || []
        const coupleTwoChildIDs = (await db.collection('users').find({ parents: { $in: [user.partner] } }).toArray()).map(child => child._id.toString()) || []
        const uniqueChildren = coupleOneChildIDs.concat(coupleTwoChildIDs.filter((item) => coupleOneChildIDs.indexOf(item) < 0))
        couplesMap[coupleID] = {
          id: coupleID,
          group: 'couple',
          coupleOne: user._id.toString(),
          coupleTwo: user.partner.toString(),
          children: uniqueChildren
        }
      }
    }
    // single parents
    if (user.children?.length > 0 && !user.partner) {
      const coupleID = [user._id.toString(), 'singleParent'].sort().join('-')
      couplesMap[coupleID] = {
        id: coupleID,
        group: 'singleParent',
        coupleOne: user._id.toString(),
        children: user.children.map(child => child.toString())
      }
    }
  }

  const couples = Object.values(couplesMap)
  const nodeCouples = couples.map(({ id, group }) => ({ id, group }))

  const nodeEdges = couples.map(couple => (
    [
      { from: couple.coupleOne, to: couple.id, color: '#F10037' },
      couple.coupleTwo ? { from: couple.coupleTwo, to: couple.id, color: '#F10037' } : null,
      ...couple.children.map(childID => (
        { from: couple.id, to: childID, color: '#07E901' }
      ))
    ]
  )).flat().filter(Boolean)

  // create a dataset with nodes & edges
  const nodes = [...nodeUsers, ...nodeCouples]
  const edges = [...nodeEdges]

  const response = { nodes, edges }

  await db.collection('cache').updateOne(
    { name: cacheKey },
    { $set: { data: response } },
    { upsert: true }
  )

  return response
}

export default async (parent, args, context, info) => {
  return getGraphData()
}
