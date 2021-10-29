/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { CoinRatesResult } from '../consuming/coin_rates'

export const protobufPackage = 'cosmonaut.oracle.consuming'

export interface QueryCoinRatesRequest {
  requestId: number
}

export interface QueryCoinRatesResponse {
  result: CoinRatesResult | undefined
}

export interface QueryLastCoinRatesIdRequest {}

export interface QueryLastCoinRatesIdResponse {
  requestId: number
}

const baseQueryCoinRatesRequest: object = { requestId: 0 }

export const QueryCoinRatesRequest = {
  encode(message: QueryCoinRatesRequest, writer: Writer = Writer.create()): Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).int64(message.requestId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCoinRatesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryCoinRatesRequest } as QueryCoinRatesRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryCoinRatesRequest {
    const message = { ...baseQueryCoinRatesRequest } as QueryCoinRatesRequest
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = Number(object.requestId)
    } else {
      message.requestId = 0
    }
    return message
  },

  toJSON(message: QueryCoinRatesRequest): unknown {
    const obj: any = {}
    message.requestId !== undefined && (obj.requestId = message.requestId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryCoinRatesRequest>): QueryCoinRatesRequest {
    const message = { ...baseQueryCoinRatesRequest } as QueryCoinRatesRequest
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = object.requestId
    } else {
      message.requestId = 0
    }
    return message
  }
}

const baseQueryCoinRatesResponse: object = {}

export const QueryCoinRatesResponse = {
  encode(message: QueryCoinRatesResponse, writer: Writer = Writer.create()): Writer {
    if (message.result !== undefined) {
      CoinRatesResult.encode(message.result, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCoinRatesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryCoinRatesResponse } as QueryCoinRatesResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.result = CoinRatesResult.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryCoinRatesResponse {
    const message = { ...baseQueryCoinRatesResponse } as QueryCoinRatesResponse
    if (object.result !== undefined && object.result !== null) {
      message.result = CoinRatesResult.fromJSON(object.result)
    } else {
      message.result = undefined
    }
    return message
  },

  toJSON(message: QueryCoinRatesResponse): unknown {
    const obj: any = {}
    message.result !== undefined && (obj.result = message.result ? CoinRatesResult.toJSON(message.result) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryCoinRatesResponse>): QueryCoinRatesResponse {
    const message = { ...baseQueryCoinRatesResponse } as QueryCoinRatesResponse
    if (object.result !== undefined && object.result !== null) {
      message.result = CoinRatesResult.fromPartial(object.result)
    } else {
      message.result = undefined
    }
    return message
  }
}

const baseQueryLastCoinRatesIdRequest: object = {}

export const QueryLastCoinRatesIdRequest = {
  encode(_: QueryLastCoinRatesIdRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLastCoinRatesIdRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLastCoinRatesIdRequest } as QueryLastCoinRatesIdRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): QueryLastCoinRatesIdRequest {
    const message = { ...baseQueryLastCoinRatesIdRequest } as QueryLastCoinRatesIdRequest
    return message
  },

  toJSON(_: QueryLastCoinRatesIdRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryLastCoinRatesIdRequest>): QueryLastCoinRatesIdRequest {
    const message = { ...baseQueryLastCoinRatesIdRequest } as QueryLastCoinRatesIdRequest
    return message
  }
}

const baseQueryLastCoinRatesIdResponse: object = { requestId: 0 }

export const QueryLastCoinRatesIdResponse = {
  encode(message: QueryLastCoinRatesIdResponse, writer: Writer = Writer.create()): Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).int64(message.requestId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLastCoinRatesIdResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLastCoinRatesIdResponse } as QueryLastCoinRatesIdResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryLastCoinRatesIdResponse {
    const message = { ...baseQueryLastCoinRatesIdResponse } as QueryLastCoinRatesIdResponse
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = Number(object.requestId)
    } else {
      message.requestId = 0
    }
    return message
  },

  toJSON(message: QueryLastCoinRatesIdResponse): unknown {
    const obj: any = {}
    message.requestId !== undefined && (obj.requestId = message.requestId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryLastCoinRatesIdResponse>): QueryLastCoinRatesIdResponse {
    const message = { ...baseQueryLastCoinRatesIdResponse } as QueryLastCoinRatesIdResponse
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = object.requestId
    } else {
      message.requestId = 0
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** CoinRatesResult defines a rpc handler method for MsgCoinRatesData. */
  CoinRatesResult(request: QueryCoinRatesRequest): Promise<QueryCoinRatesResponse>
  /** LastCoinRatesId query the last CoinRates result id */
  LastCoinRatesId(request: QueryLastCoinRatesIdRequest): Promise<QueryLastCoinRatesIdResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  CoinRatesResult(request: QueryCoinRatesRequest): Promise<QueryCoinRatesResponse> {
    const data = QueryCoinRatesRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.oracle.consuming.Query', 'CoinRatesResult', data)
    return promise.then((data) => QueryCoinRatesResponse.decode(new Reader(data)))
  }

  LastCoinRatesId(request: QueryLastCoinRatesIdRequest): Promise<QueryLastCoinRatesIdResponse> {
    const data = QueryLastCoinRatesIdRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.oracle.consuming.Query', 'LastCoinRatesId', data)
    return promise.then((data) => QueryLastCoinRatesIdResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
