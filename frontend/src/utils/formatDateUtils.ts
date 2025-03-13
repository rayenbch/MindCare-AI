export const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
        timeZone: "America/New_York",
    });
    };
    