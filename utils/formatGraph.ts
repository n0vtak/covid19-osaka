type DataType = {
  日付: Date
  小計: number
}

type GraphDataType = {
  label: string
  transition: number
  cumulative: number
  weekly: number
}

export default (data: DataType[]) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  let patSum = 0
  let weeklyTotal = 0
  let d1 = 0
  let d2 = 0
  let d3 = 0
  let d4 = 0
  let d5 = 0
  let d6 = 0
  data
    .filter(d => new Date(d['日付']) < today)
    .forEach(d => {
      const date = new Date(d['日付'])
      const subTotal = d['小計']
      if (!isNaN(subTotal)) {
        patSum += subTotal
        weeklyTotal = subTotal + d1 + d2 + d3 + d4 + d5 + d6
        d6 = d5
        d5 = d4
        d4 = d3
        d3 = d2
        d2 = d1
        d1 = subTotal
        graphData.push({
          label: `${date.getMonth() + 1}/${date.getDate()}`,
          transition: subTotal,
          cumulative: patSum,
          weekly: weeklyTotal
        })
      }
    })
  return graphData
}
