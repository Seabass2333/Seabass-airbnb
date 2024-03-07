'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhoto, TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (url: string) => void
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const onUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )

  return (
    <div className='flex flex-col gap-3'>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset='qmcgmisd'
        options={{
          maxFiles: 1
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'
            >
              <TbPhotoPlus size={50} />
              <div className='font-semibold text-lg'>Click to upload</div>
              {value && (
                <div className='absolute w-full h-full inset-0'>
                  <Image
                    src={value}
                    layout='fill'
                    objectFit='cover'
                    alt='uploaded image'
                  />
                </div>
              )}
            </div>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
