'use client'

import { Range } from 'react-date-range'
import Calendar from '../inputs/Calendar'
import Button from '../Button'

interface ListingReservationProps {
  price: number
  dataRange: Range
  totalPrice: number
  onChangeDate: (date: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dataRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='font-light text-neutral-600'>/night</div>
      </div>
      <hr />
      <Calendar
        value={dataRange}
        disabledDates={disabledDates}
        onChange={(date) => onChangeDate(date)}
      />
      <hr />
      <div className='p-4'>
        <Button
          disabled={disabled}
          label='Reserve'
          onClick={onSubmit}
        />
      </div>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}

export default ListingReservation
