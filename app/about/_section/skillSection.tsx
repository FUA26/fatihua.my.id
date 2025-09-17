import { STACKS } from '@/data/skill'
import type { ReactNode } from 'react'
import Marquee from 'react-fast-marquee'

function SkillSection() {
  const stacksInArray = Object.entries(STACKS) as [string, ReactNode][]

  const totalRows = 3
  const itemsPerRow = Math.ceil(stacksInArray.length / totalRows)

  return (
    <div className="flex flex-col space-y-1 overflow-x-hidden">
      {Array.from({ length: totalRows }, (_, rowIndex) => {
        const startIndex = rowIndex * itemsPerRow
        const endIndex = startIndex + itemsPerRow
        const rowItems = stacksInArray.slice(startIndex, endIndex)

        return (
          <Marquee
            speed={25}
            className="py-3"
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={rowIndex}
            direction={rowIndex % 2 === 0 ? 'left' : 'right'}
          >
            {rowItems.map(([name, icon], index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div className="px-2" key={index}>
                <div className="flex w-full space-x-2 rounded-full px-4 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.15)] dark:shadow-neutral-800">
                  <div className="h-6 w-6">{icon}</div>
                  <div className="whitespace-nowrap">{name}</div>
                </div>
              </div>
            ))}
          </Marquee>
        )
      })}
    </div>
  )
}

export default SkillSection
