interface ZamModelViewer {
    _reset(): void;
    setModel(model: string): void;
    load(): Promise<void>;
    render(): this;
    destroy(): void;
    model: any;
    modelFile: any;
}

interface Window {
    Wow?: {
        Item?: {
            get: (id: number) => Promise<Record<string, any>>;
        };
        viewer?: {
            extensionToUse: string;
        };
    };
    WH?: Record<string, any>;
    ZamModelViewer?: new (...args: any[]) => ZamModelViewer;
}

declare const WH: Window["WH"];
export { WH };
