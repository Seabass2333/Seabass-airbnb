'use client'

import { DateRange, Range, RangeKeyDict } from 'react-date-range'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

interface CalendarProps {
  value: Range
  disabledDates: Date[]
  onChange: (date: RangeKeyDict) => void
}
const Calendar: React.FC<CalendarProps> = ({
  value,
  disabledDates,
  onChange
}) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      // ranges={[value]}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      disabledDates={disabledDates}
      minDate={new Date()}
    />
  )
}

export default Calendar
