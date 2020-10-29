//do formatowania dat - np. 2020-1-3 na 2020-01-03
export function formatZero(nr) {
    return String(nr).padStart(2, "0");
}