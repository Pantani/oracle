import { txClient, queryClient, MissingWalletError, registry } from './module';
// @ts-ignore
import { SpVuexError } from '@starport/vuex';
import { CoinRatesCallData } from "./module/types/consuming/coin_rates";
import { CoinRatesResult } from "./module/types/consuming/coin_rates";
import { ConsumingPacketData } from "./module/types/consuming/packet";
import { NoData } from "./module/types/consuming/packet";
export { CoinRatesCallData, CoinRatesResult, ConsumingPacketData, NoData };
async function initTxClient(vuexGetters) {
    return await txClient(vuexGetters['common/wallet/signer'], {
        addr: vuexGetters['common/env/apiTendermint']
    });
}
async function initQueryClient(vuexGetters) {
    return await queryClient({
        addr: vuexGetters['common/env/apiCosmos']
    });
}
function mergeResults(value, next_values) {
    for (let prop of Object.keys(next_values)) {
        if (Array.isArray(next_values[prop])) {
            value[prop] = [...value[prop], ...next_values[prop]];
        }
        else {
            value[prop] = next_values[prop];
        }
    }
    return value;
}
function getStructure(template) {
    let structure = { fields: [] };
    for (const [key, value] of Object.entries(template)) {
        let field = {};
        field.name = key;
        field.type = typeof value;
        structure.fields.push(field);
    }
    return structure;
}
const getDefaultState = () => {
    return {
        CoinRatesResult: {},
        LastCoinRatesId: {},
        _Structure: {
            CoinRatesCallData: getStructure(CoinRatesCallData.fromPartial({})),
            CoinRatesResult: getStructure(CoinRatesResult.fromPartial({})),
            ConsumingPacketData: getStructure(ConsumingPacketData.fromPartial({})),
            NoData: getStructure(NoData.fromPartial({})),
        },
        _Registry: registry,
        _Subscriptions: new Set(),
    };
};
// initial state
const state = getDefaultState();
export default {
    namespaced: true,
    state,
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState());
        },
        QUERY(state, { query, key, value }) {
            state[query][JSON.stringify(key)] = value;
        },
        SUBSCRIBE(state, subscription) {
            state._Subscriptions.add(JSON.stringify(subscription));
        },
        UNSUBSCRIBE(state, subscription) {
            state._Subscriptions.delete(JSON.stringify(subscription));
        }
    },
    getters: {
        getCoinRatesResult: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.CoinRatesResult[JSON.stringify(params)] ?? {};
        },
        getLastCoinRatesId: (state) => (params = { params: {} }) => {
            if (!params.query) {
                params.query = null;
            }
            return state.LastCoinRatesId[JSON.stringify(params)] ?? {};
        },
        getTypeStructure: (state) => (type) => {
            return state._Structure[type].fields;
        },
        getRegistry: (state) => {
            return state._Registry;
        }
    },
    actions: {
        init({ dispatch, rootGetters }) {
            console.log('Vuex module: cosmonaut.oracle.consuming initialized!');
            if (rootGetters['common/env/client']) {
                rootGetters['common/env/client'].on('newblock', () => {
                    dispatch('StoreUpdate');
                });
            }
        },
        resetState({ commit }) {
            commit('RESET_STATE');
        },
        unsubscribe({ commit }, subscription) {
            commit('UNSUBSCRIBE', subscription);
        },
        async StoreUpdate({ state, dispatch }) {
            state._Subscriptions.forEach(async (subscription) => {
                try {
                    const sub = JSON.parse(subscription);
                    await dispatch(sub.action, sub.payload);
                }
                catch (e) {
                    throw new SpVuexError('Subscriptions: ' + e.message);
                }
            });
        },
        async QueryCoinRatesResult({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryCoinRatesResult(key.request_id)).data;
                commit('QUERY', { query: 'CoinRatesResult', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryCoinRatesResult', payload: { options: { all }, params: { ...key }, query } });
                return getters['getCoinRatesResult']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryCoinRatesResult', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async QueryLastCoinRatesId({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            try {
                const key = params ?? {};
                const queryClient = await initQueryClient(rootGetters);
                let value = (await queryClient.queryLastCoinRatesId()).data;
                commit('QUERY', { query: 'LastCoinRatesId', key: { params: { ...key }, query }, value });
                if (subscribe)
                    commit('SUBSCRIBE', { action: 'QueryLastCoinRatesId', payload: { options: { all }, params: { ...key }, query } });
                return getters['getLastCoinRatesId']({ params: { ...key }, query }) ?? {};
            }
            catch (e) {
                throw new SpVuexError('QueryClient:QueryLastCoinRatesId', 'API Node Unavailable. Could not perform query: ' + e.message);
            }
        },
        async sendMsgCoinRatesData({ rootGetters }, { value, fee = [], memo = '' }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgCoinRatesData(value);
                const result = await txClient.signAndBroadcast([msg], { fee: { amount: fee,
                        gas: "200000" }, memo });
                return result;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgCoinRatesData:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgCoinRatesData:Send', 'Could not broadcast Tx: ' + e.message);
                }
            }
        },
        async MsgCoinRatesData({ rootGetters }, { value }) {
            try {
                const txClient = await initTxClient(rootGetters);
                const msg = await txClient.msgCoinRatesData(value);
                return msg;
            }
            catch (e) {
                if (e == MissingWalletError) {
                    throw new SpVuexError('TxClient:MsgCoinRatesData:Init', 'Could not initialize signing client. Wallet is required.');
                }
                else {
                    throw new SpVuexError('TxClient:MsgCoinRatesData:Create', 'Could not create message: ' + e.message);
                }
            }
        },
    }
};
