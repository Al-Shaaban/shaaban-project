import { useEffect, useState } from 'react'
import { useDialog } from '~hooks/use-dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '~ui/carousel'
import { DialogEmpty } from '~ui/dialog/dialog-empty'
import { cn } from '~utils/functions/misc.functions'
import Autoplay from 'embla-carousel-autoplay'

type Props = {
  images: string[]
  width?: number | string
  height?: number | string
  delay?: number
  arrowsHidden?: boolean
}

export function CarouselImage({ height = 168, width = 300, ...props }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [preview, setPreview] = useState<boolean>(false)
  const { dialogState, toggleDialog } = useDialog(['expandImage'])

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: props.delay || 2000,
            active: props.delay && props.delay > 0 ? true : preview
          })
        ]}
        setApi={setApi}
        className={'relative'}
        onMouseOver={() => {
          if (props.delay) setPreview(true)
        }}
        onMouseOut={() => {
          if (props.delay) setPreview(false)
        }}
        style={{ width, height }}
      >
        <CarouselContent
          className={cn(`h-[${height}px] w-[${width}px] max-w-[${width}px]`)}
        >
          {props.images.map((imagePath, index) => (
            <CarouselItem key={index} style={{ height, maxWidth: width }}>
              <img
                src={imagePath}
                alt={`display ${index}`}
                className={
                  'h-full w-full cursor-pointer rounded-3xl object-cover object-center'
                }
                onClick={() => toggleDialog('expandImage')}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {props.images.length > 1 && (
          <>
            <div
              className={
                'absolute bottom-0 flex h-4 w-full flex-row items-center justify-center gap-1'
              }
            >
              {[...Array(count)].map((_, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      'flex h-2 w-2 items-center justify-center rounded-full',
                      current === index + 1 ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )
              })}
            </div>
            {!props.arrowsHidden && (
              <>
                <CarouselPrevious className={'absolute'} variant={'outline'} />
                <CarouselNext variant={'outline'} className={'mr-4'} />
              </>
            )}
          </>
        )}
      </Carousel>

      <DialogEmpty
        open={dialogState.expandImage}
        onToggleModal={() => {
          toggleDialog('expandImage')
        }}
      >
        <Carousel
          opts={{
            align: 'start',
            loop: true
          }}
          setApi={setApi}
          className={'relative'}
        >
          <CarouselContent>
            {props.images.map((imagePath, index) => (
              <CarouselItem key={index} className={'h-96'}>
                <img
                  src={imagePath}
                  alt={`display ${index}`}
                  className={'h-full w-full rounded-2xl object-contain object-center'}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {props.images.length > 1 && (
            <>
              <div
                className={
                  'absolute bottom-0 mt-2 flex h-4 w-full flex-row items-center justify-center gap-1'
                }
              >
                {[...Array(count)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={cn(
                        'flex h-2 w-2 items-center justify-center rounded-full',
                        current === index + 1 ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )
                })}
              </div>
              <CarouselPrevious className={'absolute'} variant={'outline'} />
              <CarouselNext variant={'outline'} />
            </>
          )}
        </Carousel>
      </DialogEmpty>
    </>
  )
}
