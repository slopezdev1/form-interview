export const hasObjectValue = (objectValue: any): boolean => {
    if (!objectValue || typeof objectValue !== 'object') {
        return false;
    }
    for (const key in objectValue) {
        if (Object.hasOwnProperty.call(objectValue, key)) {
            const value = objectValue[key];
            if (typeof value === 'object' && !Array.isArray(value)) {
                if (!hasObjectValue(value)) {
                    return false;
                }
            } else if (value === undefined || value === null || value === '') {
                return false;
            }
        }
    }
    return true

}