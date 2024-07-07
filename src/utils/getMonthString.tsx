

// format numberkey to string values
// 03: "march"
const Months: { [key: string]: string } = {
    "01": "Jan",
    "02": "Feb",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "Aug",
    "09": "Sep",
    '10': "Oct",
    "11": "Nov",
    '12': "Dec"
}

export const getMonth = (month: string): string => {
    return Months[month] || ""
}
