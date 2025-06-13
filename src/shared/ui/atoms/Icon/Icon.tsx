import React from 'react'
import type { SVGProps } from 'react'

// 1) Грузим все TSX-файлы из папки generated
const modules = import.meta.glob(
    './generated/**/*.tsx',
    { eager: true }
) as Record<string, { default: React.FC<SVGProps<SVGSVGElement>> }>

const icons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {}

Object.entries(modules).forEach(([filePath, mod]) => {
    // filePath: './generated/Arrow/black/ArrowLeftMd.tsx'
    // 1. Убираем префикс и расширение
    const rel = filePath
        .replace(/^\.\/generated\//, '')  // 'Arrow/black/ArrowLeftMd.tsx'
        .replace(/\.tsx$/, '')             // 'Arrow/black/ArrowLeftMd'

    // 2. Разбиваем на части [category, color, fileName]
    const [category, color, fileName] = rel.split('/')

    // 3. Конвертим CamelCase → kebab-case
    const base = fileName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()                     // 'arrow-left-md'

    // 4. Ключ — базовое имя + дефис + цвет
    const key = `${base}-${color.toLowerCase()}`

    icons[key] = mod.default
})

console.log('Available icons:', Object.keys(icons))
// → ['arrow-left-md-black','arrow-left-md-red', …]

export type IconName = keyof typeof icons

interface IconProps extends SVGProps<SVGSVGElement> {
    name: IconName
    size?: number
    color?: string
}

export const Icon: React.FC<IconProps> = ({
                                              name,
                                              size = 24,
                                              color = 'currentColor',
                                              ...rest
                                          }) => {
    const Svg = icons[name]
    if (!Svg) {
        console.warn('Icon not found:', name)
        return null
    }
    return <Svg width={size} height={size} fill={color} {...rest} />
}