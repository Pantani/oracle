import { Reader, Writer } from 'protobufjs/minimal';
import { CoinRatesResult } from '../consuming/coin_rates';
export declare const protobufPackage = "cosmonaut.oracle.consuming";
export interface QueryCoinRatesRequest {
    requestId: number;
}
export interface QueryCoinRatesResponse {
    result: CoinRatesResult | undefined;
}
export interface QueryLastCoinRatesIdRequest {
}
export interface QueryLastCoinRatesIdResponse {
    requestId: number;
}
export declare const QueryCoinRatesRequest: {
    encode(message: QueryCoinRatesRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCoinRatesRequest;
    fromJSON(object: any): QueryCoinRatesRequest;
    toJSON(message: QueryCoinRatesRequest): unknown;
    fromPartial(object: DeepPartial<QueryCoinRatesRequest>): QueryCoinRatesRequest;
};
export declare const QueryCoinRatesResponse: {
    encode(message: QueryCoinRatesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCoinRatesResponse;
    fromJSON(object: any): QueryCoinRatesResponse;
    toJSON(message: QueryCoinRatesResponse): unknown;
    fromPartial(object: DeepPartial<QueryCoinRatesResponse>): QueryCoinRatesResponse;
};
export declare const QueryLastCoinRatesIdRequest: {
    encode(_: QueryLastCoinRatesIdRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLastCoinRatesIdRequest;
    fromJSON(_: any): QueryLastCoinRatesIdRequest;
    toJSON(_: QueryLastCoinRatesIdRequest): unknown;
    fromPartial(_: DeepPartial<QueryLastCoinRatesIdRequest>): QueryLastCoinRatesIdRequest;
};
export declare const QueryLastCoinRatesIdResponse: {
    encode(message: QueryLastCoinRatesIdResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLastCoinRatesIdResponse;
    fromJSON(object: any): QueryLastCoinRatesIdResponse;
    toJSON(message: QueryLastCoinRatesIdResponse): unknown;
    fromPartial(object: DeepPartial<QueryLastCoinRatesIdResponse>): QueryLastCoinRatesIdResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** CoinRatesResult defines a rpc handler method for MsgCoinRatesData. */
    CoinRatesResult(request: QueryCoinRatesRequest): Promise<QueryCoinRatesResponse>;
    /** LastCoinRatesId query the last CoinRates result id */
    LastCoinRatesId(request: QueryLastCoinRatesIdRequest): Promise<QueryLastCoinRatesIdResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    CoinRatesResult(request: QueryCoinRatesRequest): Promise<QueryCoinRatesResponse>;
    LastCoinRatesId(request: QueryLastCoinRatesIdRequest): Promise<QueryLastCoinRatesIdResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
