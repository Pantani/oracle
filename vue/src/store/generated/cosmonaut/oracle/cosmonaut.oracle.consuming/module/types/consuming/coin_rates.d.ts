import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "cosmonaut.oracle.consuming";
export interface CoinRatesCallData {
    symbols: string[];
    multiplier: number;
}
export interface CoinRatesResult {
    rates: number[];
}
export declare const CoinRatesCallData: {
    encode(message: CoinRatesCallData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): CoinRatesCallData;
    fromJSON(object: any): CoinRatesCallData;
    toJSON(message: CoinRatesCallData): unknown;
    fromPartial(object: DeepPartial<CoinRatesCallData>): CoinRatesCallData;
};
export declare const CoinRatesResult: {
    encode(message: CoinRatesResult, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): CoinRatesResult;
    fromJSON(object: any): CoinRatesResult;
    toJSON(message: CoinRatesResult): unknown;
    fromPartial(object: DeepPartial<CoinRatesResult>): CoinRatesResult;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
