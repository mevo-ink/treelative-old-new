export default async (parent, args, context, info) => {
  const users = await context.db.findAll('users')

  const nodeUsers = users.map(user => ({
    id: user.id,
    label: user.shortName,
    group: 'individual',
    image: `${process.env.STORAGE_ENDPOINT}/avatars/${user.id}.png`,
    brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }))

  const couplesMap = {}
  for (const user of users) {
    if (user.partner) {
      const coupleID = [user.id, user.partner].sort().join('-')
      if (!couplesMap[coupleID]) {
        const coupleOneChildIDs = user.children
        const coupleTwoChildIDs = (await context.db.findAll('users', { parent: { 'array-contains': user.partner } })).map(child => child.id)
        const uniqueChildren = coupleOneChildIDs.concat(coupleTwoChildIDs.filter((item) => coupleOneChildIDs.indexOf(item) < 0))
        couplesMap[coupleID] = {
          id: coupleID,
          group: 'couple',
          coupleOne: user.id,
          coupleTwo: user.partner,
          children: uniqueChildren
        }
      }
    }
    // single parents
    if (user.children?.length > 0 && !user.partner) {
      const coupleID = [user.id, 'singleParent'].sort().join('-')
      couplesMap[coupleID] = {
        id: coupleID,
        group: 'singleParent',
        coupleOne: user,
        children: user.children
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

  return { nodes, edges }
}
