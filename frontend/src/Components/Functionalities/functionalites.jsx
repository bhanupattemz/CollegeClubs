
export function ConvertTime(time) {
    if (time) {
        let formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(new Date(time));
        formattedDate = formattedDate.split(" ")
        formattedDate[5] = formattedDate[5].toUpperCase()

        return `${formattedDate[0]} ${formattedDate[1]} ${formattedDate[2]}, ${formattedDate[4]} ${formattedDate[5]}`
    }
}


// export const BACKENDURL = "http://localhost:8000/api/v1"
export const BACKENDURL = "/api/v1"

export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
