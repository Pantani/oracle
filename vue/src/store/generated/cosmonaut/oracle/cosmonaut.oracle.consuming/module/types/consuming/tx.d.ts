import { Reader, Writer } from 'protobufjs/minimal';
import { CoinRatesCallData } from '../consuming/coin_rates';
import { Coin } from '../cosmos/base/v1beta1/coin';
export declare const protobufPackage = "cosmonaut.oracle.consuming";
export interface MsgCoinRatesData {
    creator: string;
    oracleScriptId: number;
    sourceChannel: string;
    calldata: CoinRatesCallData | undefined;
    askCount: number;
    minCount: number;
    feeLimit: Coin[];
    prepareGas: number;
    executeGas: number;
    clientId: string;
}
export interface MsgCoinRatesDataResponse {
}
export declare const MsgCoinRatesData: {
    encode(message: MsgCoinRatesData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCoinRatesData;
    fromJSON(object: any): MsgCoinRatesData;
    toJSON(message: MsgCoinRatesData): unknown;
    fromPartial(object: DeepPartial<MsgCoinRatesData>): MsgCoinRatesData;
};
export declare const MsgCoinRatesDataResponse: {
    encode(_: MsgCoinRatesDataResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCoinRatesDataResponse;
    fromJSON(_: any): MsgCoinRatesDataResponse;
    toJSON(_: MsgCoinRatesDataResponse): unknown;
    fromPartial(_: DeepPartial<MsgCoinRatesDataResponse>): MsgCoinRatesDataResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CoinRatesData(request: MsgCoinRatesData): Promise<MsgCoinRatesDataResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CoinRatesData(request: MsgCoinRatesData): Promise<MsgCoinRatesDataResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
