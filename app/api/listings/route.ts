import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.redirect('/login')
  }

  const body = await req.json()
  const { category, location, guestCount, roomCount, bathroomCount, imageSrc, price, title, description } = body

  Object.keys(body).forEach((key) => {
    if (!body[key]) {
      return NextResponse.error()
    }
    if (typeof body[key] === 'string') {
      body[key] = body[key].trim()
    }
  })


  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: user.id
    }
  })

  return NextResponse.json(listing)
}
