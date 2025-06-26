import React from 'react'
import type { SVGProps } from 'react'

const modules = import.meta.glob(
    './generated/**/*.tsx',
    { eager: true }
) as Record<string, { default: React.FC<SVGProps<SVGSVGElement>> }>

const icons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {}

Object.entries(modules).forEach(([filePath, mod]) => {
    const rel = filePath
        .replace(/^\.\/generated\//, '')
        .replace(/\.tsx$/, '')

    const [category, color, fileName] = rel.split('/')

    const base = fileName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()                     // 'arrow-left-md'

    const key = `${base}-${color.toLowerCase()}`

    icons[key] = mod.default
})

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