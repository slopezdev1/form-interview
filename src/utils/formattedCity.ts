export const formattedCity = (city: string): string => {
    return city
        .replace(/\s+Province$/i, '')
        .trim();
}