interface LogWritable<T> {
    write: (chunk: T) => boolean;
}
export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
export interface LogOptions {
    dest: LogWritable<LogMessage>;
    level: LoggerLevel;
}
export declare const dateTimeFormat: Intl.DateTimeFormat;
export interface LogMessage {
    label: string | null;
    level: LoggerLevel;
    message: string;
}
export declare const levels: Record<LoggerLevel, number>;
/** Full logging API */
export declare function log(opts: LogOptions, level: LoggerLevel, label: string | null, message: string): void;
/** Emit a user-facing message. Useful for UI and other console messages. */
export declare function info(opts: LogOptions, label: string | null, message: string): void;
/** Emit a warning message. Useful for high-priority messages that aren't necessarily errors. */
export declare function warn(opts: LogOptions, label: string | null, message: string): void;
/** Emit a error message, Useful when Astro can't recover from some error. */
export declare function error(opts: LogOptions, label: string | null, message: string): void;
type LogFn = typeof info | typeof warn | typeof error;
export declare function table(opts: LogOptions, columns: number[]): (logFn: LogFn, ...input: Array<any>) => void;
export declare function debug(...args: any[]): void;
export declare let defaultLogLevel: LoggerLevel;
/** Print out a timer message for debug() */
export declare function timerMessage(message: string, startTime?: number): string;
export declare class Logger {
    options: LogOptions;
    constructor(options: LogOptions);
    info(label: string | null, message: string): void;
    warn(label: string | null, message: string): void;
    error(label: string | null, message: string): void;
    debug(label: string | null, message: string, ...args: any[]): void;
    level(): LoggerLevel;
    forkIntegrationLogger(label: string): AstroIntegrationLogger;
}
export declare class AstroIntegrationLogger {
    options: LogOptions;
    label: string;
    constructor(logging: LogOptions, label: string);
    /**
     * Creates a new logger instance with a new label, but the same log options.
     */
    fork(label: string): AstroIntegrationLogger;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
}
export {};
