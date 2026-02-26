import {useEffect, useRef} from 'react'
import {TimepickerUI} from 'timepicker-ui'
import 'timepicker-ui/main.css'

const TimePicker = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<TimepickerUI | null>(null)

  useEffect(() => {
    if (!inputRef.current) return
    pickerRef.current = new TimepickerUI(inputRef.current, {
      ui: {
        theme: 'basic',
        animation: true,
        backdrop: true,
      },
      clock: {
        type: '12h',
        disabledTime: {interval: '12:00AM - 8:00AM'},
      },
      callbacks: {
        onConfirm: (data) => {
          console.log('Selected time:', data)
        },
      },
    })
    pickerRef.current.create()

    return () => {
      pickerRef.current?.destroy()
    }
  }, [])

  return <input ref={inputRef} className='dark:text-white border border-solid border-neutral-400 dark:border-neutral-800 p-2 p-1 rounded-lg' type="text" placeholder='Select a time'/>
}

export default TimePicker
