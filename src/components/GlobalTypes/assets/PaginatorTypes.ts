export type TPaginatorProps ={
    OnChangedPage : (PageNumber : number) => void
    currentPage : number
    totalUsersCount : number
    pageSize : number
    PortionSize : number
}