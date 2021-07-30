const flatInline = (array: [number, number][]): [number, number][] => {

    let ranges: [number, number][] = []
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            ranges.push([array[0][0], array[0][1]])
            
        } else {
            let l = array[i][0]
            let r = array[i][1]
            let min=undefined;
            let max=undefined;

            const rangeOfl = ranges.find(range => range[0] <= l && range[1] >= l)
            const rangeOfr = ranges.find(range => range[0] <= r && range[1] >= r)

            
            if (!rangeOfl) {
                
                min = l;
            }
            if (!rangeOfr) {

                max = r
            }
            if (min!==undefined && max!==undefined) {
                
                ranges = ranges.filter(range => !(range[0] >= min && range[1] <= max))
                ranges.push([min, max])

            } else if (min!==undefined && max===undefined) {
                
                const superSets = ranges.filter(range => range[0] <= r && range[1] >= r).flat().sort((a, b) => a-b)
                const maximumSuperSet = superSets[superSets.length - 1]
                max = maximumSuperSet
                ranges = ranges.filter(range => !(range[0] >= min && range[1] <= max))
                ranges.push([min, max])

            } else if (min===undefined && max!==undefined) {
                const superSets = ranges.filter(range => range[0] <= l && range[1] >= l).flat().sort((a, b) => a-b)
                
                const minimumSuperSet = superSets[0]
                min = minimumSuperSet
                ranges = ranges.filter(range => !(range[0] >= min && range[1] <= max))
                ranges.push([min, max])
            }
            else if (min===undefined && max===undefined) {
                ranges = ranges.filter(range => !(range[0] >= rangeOfl[0] && range[1] <= rangeOfr[1]))
                    
                ranges.push([rangeOfl[0], rangeOfr[1]])
            }
        }
    }
    return ranges
}

export default flatInline