import LaptopIcon from '~icons/laptop'
import { CarouselImage } from '~ui/carousel/carousel-image'
import { InputDate } from '~ui/inputs/input-date'
import { InputDateRange } from '~ui/inputs/input-date-range'
import { InputFile } from '~ui/inputs/input-file'
import { InputLabeled } from '~ui/inputs/input-labeled'
import { InputNumber } from '~ui/inputs/input-number'
import { InputPassword } from '~ui/inputs/input-password'
import { InputText } from '~ui/inputs/input-text'
import { InputTextArea } from '~ui/inputs/input-textarea'

export default function HomePage() {
  return (
    <div className={'flex flex-col gap-3'}>
      <div className={'flex flex-col gap-3 py-12'}>
        <h1 className={'text-center text-3xl transition-colors ease-in-out md:text-5xl'}>
          Create <span className={'text-blue-600'}>Shaaban Project</span>
        </h1>
        <p className={'flex flex-wrap justify-center gap-1 text-center'}>
          Build Your Next
          <span className={'border-b-2 border-orange-600 italic'}>Million $Dollar</span>
          Project with 3 steps
        </p>
      </div>

      <div className={'grid grid-cols-2 gap-3'}>
        <div className={'col-span-2'}>
          <CarouselImage
            images={[
              'https://images.unsplash.com/photo-1580654712603-eb43273aff33?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1570829174962-38c53efc5e5a?q=80&w=1726&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]}
          />
        </div>

        <InputDate />
        <InputDateRange label={'pick a date range'} />
        <InputLabeled label={<LaptopIcon />} placeholder={'iconed input'} />
        <InputNumber placeholder={'number'} />
        <InputText placeholder={'text'} />
        <InputPassword placeholder={'*******'} />
        <InputFile />
        <InputTextArea placeholder={'textarea'} />
      </div>
    </div>
  )
}
