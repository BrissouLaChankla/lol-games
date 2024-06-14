function normalizeString(str) {
    console.log(str)
    return str
        .normalize("NFD") // Décompose les caractères accentués
        .replace(/[\u0300-\u036f]/g, "") // Supprime les marques de diacritiques
        .replace(/[^\w\s]/gi, '') // Supprime la ponctuation
        .replace(/\s+/g, ' ') // Remplace les espaces multiples par un seul espace
        .trim() // Supprime les espaces au début et à la fin
        .toLowerCase(); // Convertit en minuscules
}

export function compareAnswers(str1, str2) {
    const normalizedStr1 = normalizeString(str1);
    const normalizedStr2 = normalizeString(str2);
    return normalizedStr1 === normalizedStr2;
}