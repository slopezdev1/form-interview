export const getItems =  (results: any[]) => {
    return results?.map(result => {
        return {
            ...result,
            name: result.nombre,
            id: result.id
        }
    })
}