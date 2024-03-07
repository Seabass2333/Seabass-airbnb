'use client'

import { useRouter } from 'next/navigation'
import Heading from './navbar/Heading'
import Button from './Button'

interface EmptyStateProps {
  title?: string
  subTitle?: string
  showReset?: boolean
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results found',
  subTitle = 'Try adjusting your search or filter to find what you are looking for',
  showReset
}) => {
  const router = useRouter()

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading
        center
        title={title}
        subTitle={subTitle}
      />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            onClick={() => router.push('/')}
            label='Remove all filters'
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
