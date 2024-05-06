'use client'

import '~styles/file-input.css'

import { forwardRef, useState } from 'react'
import CloudIcon from '~icons/cloud-upload'
import CrossIcon from '~icons/cross'
import DownloadIcon from '~icons/download'
import type { IconType } from '~types/icons'
import { cn } from '~utils/functions/misc.functions'
import hash from 'object-hash'

import type { InputProps } from '.'

type ImageType = {
  id: string
  imageUrl: string
  onDelete: (id: string) => void
}

interface ImageProps {
  id: string
  imageUrl: string
}

interface InputFileProps extends InputProps {
  label?: string
  description?: string
  dropIcon?: (props: IconType) => JSX.Element
  leaveIcon?: (props: IconType) => JSX.Element
  onErrorOccur?: (errorMessage: string) => void
}

function ImageCard({ imageUrl, onDelete, id }: ImageType) {
  return (
    <div className={'relative rounded-xl border'}>
      <img
        src={imageUrl}
        alt={'file'}
        className={'h-14 w-14 rounded-xl object-cover object-center'}
      />

      <div
        onClick={() => {
          onDelete(id)
        }}
        className={
          'absolute -right-[6px] -top-[6px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-600 fill-white p-[1px] transition duration-150 hover:bg-red-300'
        }
      >
        <CrossIcon className={'h-2 w-2 fill-white'} />
      </div>
    </div>
  )
}

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      className,
      multiple,
      label = 'Choose files or drag and drop',
      description = '',
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [images, setImages] = useState<ImageProps[]>([])

    function addImage(data: FileList | null) {
      const files = data ? Array.from(data) : []
      if (files.length === 0) return

      for (const file of files) {
        if (images.find((image) => image.id === hash(file))) return
        if (!multiple) {
          setImages([{ id: hash(file), imageUrl: URL.createObjectURL(file) }])
          break
        }

        setImages((prev) => [
          { id: hash(file), imageUrl: URL.createObjectURL(file) },
          ...prev
        ])
      }
    }

    function deleteImage(id: string) {
      const updatedImages = images?.filter((image) => image.id !== id)
      setImages(updatedImages)
    }

    function triggerInput() {
      const fileInput = document.getElementById('clickabale-input')
      if (fileInput) fileInput.click()
    }

    function triggerActivity(state: boolean) {
      setIsActive(state)
    }

    return (
      <div className={'flex flex-col gap-3'}>
        <input
          id={'clickabale-input'}
          className={'hidden'}
          ref={ref}
          type={'file'}
          onChange={(e) => addImage(e.target.files)}
          multiple={multiple}
          {...props}
        />

        <div
          onClick={triggerInput}
          onMouseLeave={() => triggerActivity(false)}
          onDragOverCapture={(e) => {
            e.stopPropagation()
            e.preventDefault()

            triggerActivity(true)
          }}
          onDrop={(e) => {
            e.preventDefault()

            addImage(e.dataTransfer.files)
            triggerActivity(false)
          }}
          onDragLeave={() => triggerActivity(false)}
          onDragLeaveCapture={() => triggerActivity(false)}
          className={cn(
            'flex h-52 w-full max-w-[500px] flex-col items-center justify-center rounded-lg bg-transparent',
            className
          )}
        >
          <div
            className={cn(
              'active-animation -z-10 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg p-2',
              {
                'activate-animation  bg-black/5': isActive,
                '!z-10 !items-start': !multiple && images.length === 1
              }
            )}
          >
            {multiple || (!multiple && images.length === 0) ? (
              <>
                <DownloadIcon
                  className={cn('opacity-30 duration-300', {
                    'h-20 w-20': isActive,
                    'h-0 w-0': !isActive
                  })}
                />

                <CloudIcon
                  className={cn('opacity-30 duration-300', {
                    'h-20 w-20': !isActive,
                    'h-0 w-0': isActive
                  })}
                />

                <span className={'font-medium text-primary'}>{label}</span>
                <span className={'text-sm text-muted-foreground'}>{description}</span>
              </>
            ) : (
              <div className={'relative z-30 rounded-xl border'}>
                <img
                  src={images[0].imageUrl}
                  alt={'file'}
                  className={'h-48 w-48 rounded-xl object-cover object-center'}
                />

                <div
                  onClick={() => setImages([])}
                  className={
                    'absolute -right-[6px] -top-[6px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-600 fill-white p-[1px] transition duration-150 hover:bg-red-300'
                  }
                >
                  <CrossIcon className={'h-2 w-2 fill-white'} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={'flex items-center justify-start gap-3'}>
          {multiple &&
            images?.map((image, index) => (
              <ImageCard
                key={index}
                id={image.id}
                imageUrl={image.imageUrl}
                onDelete={(id) => {
                  deleteImage(id)
                }}
              />
            ))}
        </div>
      </div>
    )
  }
)
InputFile.displayName = 'Input File'
