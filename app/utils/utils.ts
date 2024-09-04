export function millisToRoundedTime(millis: number): string {
    millis += 1;

    const seconds = Math.floor(millis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years + "年";
    } else if (months > 0) {
        return months + "月";
    } else if (weeks > 0) {
        return weeks + "週";
    } else if (days > 0) {
        return days + "日";
    } else if (hours > 0) {
        return hours + "時間";
    } else if (minutes > 0) {
        return minutes + "分";
    } else {
        return seconds + "秒";
    }
}