'use client'

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'

import Container from '../Container'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'this property is near the beach'
  },
  {
    label: 'Windmill',
    icon: GiWindmill,
    description: 'this property has windmill view'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'this property is modern style'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'this property is the countryside'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'this property has a pool'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'this property is an island'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'this property is close to a lake'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'this property has skiing activities'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'this property is a castle'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'this property has camping activities'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'this property is in the arctic area'
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'this property is a cave house'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'this property is in the desert'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'this property is a barn house'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'this property is a luxury house'
  }
]

const Categories = () => {
  const params = useSearchParams()
  const categoryItem = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map((category, index) => (
          <CategoryBox
            key={index}
            icon={category.icon}
            label={category.label}
            selected={category.label === categoryItem}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
