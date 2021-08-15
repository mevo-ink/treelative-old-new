export default async (parent, args, context, info) => {
  const users = await context.models.User.find({}).populate('partner').lean()

  const nodeUsers = users.map(user => ({
    id: user._id,
    label: user.shortName,
    group: 'individual',
    image: `${process.env.STORAGE_ENDPOINT}/avatars/${user._id}.png`,
    brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }))

  const couplesMap = {}
  for (const user of users) {
    if (user.partner) {
      const coupleID = [user._id, user.partner._id].sort().join('-')
      if (!couplesMap[coupleID]) {
        const coupleOneChildIDs = user.children.map(({ _id }) => _id.toString())
        const coupleTwoChildIDs = user.partner.children.map(({ _id }) => _id.toString())
        const uniqueChildren = coupleOneChildIDs.concat(coupleTwoChildIDs.filter((item) => coupleOneChildIDs.indexOf(item) < 0))
        couplesMap[coupleID] = {
          id: coupleID,
          group: 'couple',
          coupleOne: user,
          coupleTwo: user.partner,
          children: uniqueChildren
        }
      }
    }
    // single parents
    if (user.children.length > 0 && !user.partner) {
      const coupleID = [user._id, 'singleParent'].sort().join('-')
      couplesMap[coupleID] = {
        id: coupleID,
        group: 'singleParent',
        coupleOne: user,
        children: user.children.map(({ _id }) => _id.toString())
      }
    }
  }

  const couples = Object.values(couplesMap)
  const nodeCouples = couples.map(({ id, group }) => ({ id, group }))

  const nodeEdges = couples.map(couple => (
    [
      { from: couple.coupleOne._id, to: couple.id, color: '#F10037' },
      couple.coupleTwo ? { from: couple.coupleTwo._id, to: couple.id, color: '#F10037' } : null,
      ...couple.children.map(childID => (
        { from: couple.id, to: childID, color: '#07E901' }
      ))
    ]
  )).flat().filter(Boolean)

  // create a dataset with nodes & edges
  const nodes = [...nodeUsers, ...nodeCouples]
  const edges = [...nodeEdges]

  return { nodes, edges }
}
