import type React from 'react'

interface IconProp {
  icon: React.ReactNode
}

const SectionHeader = ({sectionIcon, iconBg, title, description}: {sectionIcon: IconProp; iconBg: string; title: string; description: string}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex justify-center items-center rounded-full p-2 ${iconBg}`}>{sectionIcon.icon}</div>
      <h1 className="text-center whitespace-nowrap dark:text-zinc-50">{title}</h1>
      <p className="max-w-md text-center text-zinc-500 text-(length:--text-fluid) dark:text-zinc-400">{description}</p>
    </div>
  )
}

export default SectionHeader
