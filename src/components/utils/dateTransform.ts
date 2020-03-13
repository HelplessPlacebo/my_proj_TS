export const DateTransform = (date:  string | null) =>{
    if(date ) {
        //@ts-ignore
        return date.split("T")[0].split().join().split("-").reverse()
    }
}