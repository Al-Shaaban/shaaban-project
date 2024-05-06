import SiteHeader from '~components/site-header'
import LaptopIcon from '~icons/laptop'
import ImageCarousel from '~ui/carousel/carousel-image'
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
    <div className={'container flex flex-col gap-3'}>
      <SiteHeader />

      <div className={'grid grid-cols-2 gap-3'}>
        <div className={'col-span-2'}>
          <ImageCarousel
            images={[
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo41KoJghc9dv9LmQP3rp8Bs6ECcowrRR7eVJxGvbWFw&s',
              'https://file.kelleybluebookimages.com/kbb/base/house/2021/2021-Lamborghini-Aventador-FrontSide_LBAVSVJ2101_640x480.jpg?downsize=382:*',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTJ7q-OfFB8yxXWs2a5EoY5CznWnS81bsYAzxWHlHLqw&s',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIKHZ1az-1XGQm9gFTK0YSPBzawF2E4TC1iq97oqa6JA&s'
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
