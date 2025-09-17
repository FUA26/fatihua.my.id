const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// Format date to "dd MMM yyyy" format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string')
  }

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export const calculateDuration = (
  startDateString: string,
  endDateString: string,
): string => {
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)
  // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid date string')
  }

  if (startDate > endDate) {
    return 'Start date must be before end date'
  }

  return getDuration(startDate, endDate)
}

function getDuration(startDate: Date, endDate: Date): string {
  const startYear = startDate.getFullYear()
  const startMonth = startDate.getMonth()
  const endYear = endDate.getFullYear()
  const endMonth = endDate.getMonth()

  let year = endYear - startYear
  let month = endMonth - startMonth

  if (month < 0) {
    year--
    month += 12
  }

  const yearPart = year > 0 ? `${year} year${year > 1 ? 's' : ''}` : ''
  const monthPart = month > 0 ? `${month} month${month > 1 ? 's' : ''}` : ''

  return [yearPart, monthPart].filter(Boolean).join(' ') || '0 months'
}
