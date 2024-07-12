// do later for createAt and updated at where 
// Prisma users DateTime types

// research more later
import { format } from 'date-fns'

export const formatTime = (date: Date) => {
    
    return format(date, 'dd, mm, yyyy')
}