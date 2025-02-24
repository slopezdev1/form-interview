export const getItems =  (results: any[]) => {
    return results?.map(result => {
        return {
            ...result,
            name: result.name,
            id: result.iso2
        }
    })
}