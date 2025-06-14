/// <reference types="vite/client" />
interface ImportMeta {
    readonly globEager: (
        pattern: string
    ) => Record<string, { default: never } | never>;
    readonly glob: (
        pattern: string,
        options?: { eager?: boolean; import?: string }
    ) => Record<string, never>;
}