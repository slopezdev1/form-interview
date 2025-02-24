export const formattedCity = (city: string): string => {
    return city
        .replace(/\s+Province$/i, '') // Elimina 'Province' al final con o sin espacios
        .trim(); // Elimina espacios extras al inicio o final
}