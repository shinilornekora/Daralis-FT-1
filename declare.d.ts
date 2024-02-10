declare module '*.css';

declare module '*.m.css' {
    const content: Record<string, string>;
    export default content;
}