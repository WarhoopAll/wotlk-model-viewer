declare function mark(name: any): void;
declare function diff(name: any): string | 0;
declare function start(name: any): void;
declare function end(name: any): number | undefined;
declare function summary(): void;
declare function initNetMonitor(): void;
declare function netSummary(): void;
declare function monitorDraw(): void;
export { mark, diff, start, end, summary, initNetMonitor, netSummary, monitorDraw };
