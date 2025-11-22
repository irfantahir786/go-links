
export function formatDate(
    isoString: string | null | undefined,
    options?: Intl.DateTimeFormatOptions,
    locale: string = "en-IN"
): string {
    if (!isoString) return "N/A";

    try {
        const date = new Date(isoString);
        return date.toLocaleString(locale, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            ...options, // override defaults if needed
        });
    } catch (e) {
        console.error("Invalid date:", isoString, e);
        return "Invalid Date";
    }
}