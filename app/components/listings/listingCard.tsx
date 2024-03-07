'use client'

import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
      <div className='p-4'>
        <h1 className='text-gray-900 font-bold text-xl'>{data.title}</h1>
        <p className='mt-2 text-gray-600 text-sm'>{data.description}</p>
        {/* <div className='flex mt-3 items-center'>
        <span className='text-gray-700'>${listing.price}</span>
        <span className='flex-1 text-right text-gray-600 text-xs'>
          {listing.location}
        </span>
      </div> */}
      </div>
    </div>
  )
}

export default ListingCard
