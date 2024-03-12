'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'

import Container from '@/app/components/Container'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingHead from '@/app/components/listings/listingHead'
import { categories } from '@/app/components/navbar/Categories'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeUser, SafeListing } from '@/app/types'
import { Reservation } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { Range } from 'react-date-range'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser: SafeUser | null
  reservations?: Reservation[]
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = []
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    return reservations.map((reservation) => {
      return {
        startDate: new Date(reservation.startDate),
        endDate: new Date(reservation.endDate),
        key: 'selection'
      }
    })
  }, [reservations])

  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setLoading(true)

    axios
      .post('/api/reservations', {
        totalPrice,
        listingId: listing.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
      .then(() => {
        toast.success('Reservation created')
        setDateRange(initialDateRange)
        // router.push('/reservations')
        router.refresh()
      })
      .catch((error) => {
        toast.error('Error creating reservation')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentUser, dateRange, totalPrice, listing?.id, loginModal, router])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (days && listing.price) {
        setTotalPrice(listing.price * days)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className='max-w-screen-lg max-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(dateRange) => setDateRange(dateRange)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={loading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
