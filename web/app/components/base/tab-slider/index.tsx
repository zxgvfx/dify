<<<<<<< HEAD
import type { FC, ReactNode } from 'react'
=======
import type { FC } from 'react'
import { useEffect, useState } from 'react'
>>>>>>> bafa46393cc9b488be7080ba541f8795f52d8fa6
import cn from '@/utils/classnames'
import Badge, { BadgeState } from '@/app/components/base/badge/index'
import { useInstalledPluginList } from '@/service/use-plugins'
type Option = {
  value: string
  text: ReactNode
}

type TabSliderProps = {
  className?: string
  value: string
  onChange: (v: string) => void
  options: Option[]
}

const TabSlider: FC<TabSliderProps> = ({
  className,
  value,
  onChange,
  options,
}) => {
  const [activeIndex, setActiveIndex] = useState(options.findIndex(option => option.value === value))
  const [sliderStyle, setSliderStyle] = useState({})
  const { data: pluginList } = useInstalledPluginList()

  const updateSliderStyle = (index: number) => {
    const tabElement = document.getElementById(`tab-${index}`)
    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement
      setSliderStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: `${offsetWidth}px`,
      })
    }
  }

  useEffect(() => {
    const newIndex = options.findIndex(option => option.value === value)
    setActiveIndex(newIndex)
    updateSliderStyle(newIndex)
  }, [value, options, pluginList])

  return (
<<<<<<< HEAD
    <div className={cn('relative flex p-0.5 rounded-xl bg-components-segmented-control-bg-normal', className)}>
      {
        options.map(option => (
          <div
            key={option.value}
            className={'flex justify-center items-center h-[42px] rounded-xl cursor-pointer'}
            style={{
              width: itemWidth,
            }}
            onClick={() => onChange(option.value)}
          >
            {option.text}
          </div>
        ))
      }
      {
        current && (
          <div
            className={`
              absolute flex justify-center items-center h-[42px] rounded-xl cursor-pointer
              text-text-accent-light-mode-only bg-components-segmented-control-item-active-bg
              border-[0.5px] border-components-segmented-control-item-active-border shadow-xs transition-transform
            `}
            style={{
              width: itemWidth,
              transform: `translateX(${currentIndex * itemWidth}px)`,
            }}
          >
            {current.text}
          </div>
        )
      }
=======
    <div className={cn(className, 'inline-flex p-0.5 rounded-[10px] bg-components-segmented-control-bg-normal relative items-center justify-center')}>
      <div
        className="absolute top-0.5 bottom-0.5 left-0 right-0 bg-components-panel-bg rounded-[10px] transition-transform duration-300 ease-in-out shadows-shadow-xs"
        style={sliderStyle}
      />
      {options.map((option, index) => (
        <div
          id={`tab-${index}`}
          key={option.value}
          className={cn(
            'relative flex justify-center items-center px-2.5 py-1.5 gap-1 rounded-[10px] transition-colors duration-300 ease-in-out cursor-pointer z-10',
            'system-md-semibold',
            index === activeIndex
              ? 'text-text-primary'
              : 'text-text-tertiary',
          )}
          onClick={() => {
            if (index !== activeIndex) {
              onChange(option.value)
              updateSliderStyle(index)
            }
          }}
        >
          {option.text}
          {/* if no plugin installed, the badge won't show */}
          {option.value === 'plugins'
            && (pluginList?.plugins.length ?? 0) > 0
            && <Badge
              size='s'
              uppercase={true}
              state={BadgeState.Default}
            >
              {pluginList?.plugins.length}
            </Badge>
          }
        </div>
      ))}
>>>>>>> bafa46393cc9b488be7080ba541f8795f52d8fa6
    </div>
  )
}

export default TabSlider
