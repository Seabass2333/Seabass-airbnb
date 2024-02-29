'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick?: () => void
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected = false,
  onClick = () => {}
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      {
        skipEmptyString: true,
        skipNull: true
      }
    )

    router.push(url)

    onClick()
  }, [label, params, router])

  return (
    <div
      className={`p-3 flex flex-col items-center gap-2 cursor-pointer hover:text-neutral-800 transition border-b-2 
      ${selected ? 'border-b-neutral-800' : 'border-transparent'} 
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
      onClick={handleClick}
    >
      <Icon size={24} />
      <div className='text-sm font-middle'>{label}</div>
    </div>
  )
}

export default CategoryBox
