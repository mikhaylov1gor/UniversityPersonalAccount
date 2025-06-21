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

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.gif" {
    const value: string;
    export default value;
}