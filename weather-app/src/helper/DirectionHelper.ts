export class DirectionHelper {
    private static directions: string[] = [
        'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];

    public static getDirection(degree: number): string {
        if (degree < 0 || degree > 360) {
            throw new Error('Degree must be between 0 and 360');
        }
        const normalizedDegree = degree % 360;
        const index = Math.round(normalizedDegree / 22.5) % 16;
        return this.directions[index];
    }
}