export function getDayOfWeek(dateString: string): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    const nextDayIndex = (dayIndex + 1) % daysOfWeek.length;
    return daysOfWeek[nextDayIndex];
}
