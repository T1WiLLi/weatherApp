import { LocalDateTime } from "../types/LocalDateTime";

export class DateTimeService {
    public getCurrentLocalDateTime(): LocalDateTime {
        const now = new Date();

        return {
            dayOfWeek: this.getDayOfWeek(now),
            day: now.getDate(),
            month: this.getMonthName(now),
            year: now.getFullYear(),
            time: this.formatTime(now)
        }
    }

    private getDayOfWeek(date: Date): string {
        const daysOfWeek = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        return daysOfWeek[date.getDay()];
    }

    private getMonthName(date: Date): string {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[date.getMonth()];
    }

    private formatTime(date: Date): string {
        let hours: number | string = date.getHours();
        const minutes: string = date.getMinutes().toString().padStart(2, '0');
        const period: string = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }
}