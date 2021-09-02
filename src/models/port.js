import * as monitorPort from '../service/monitor'

export default {
  namespace: 'monitorPort',
  state: {
    portList: [],
    portListLoading: false
  },
  effects: {
    * queryPortList({payload}, {call, put}) {
      // const { call, put } = sagaEffects;
      yield put({type: 'setLoading', payload: []});
      const puzzle = yield call(monitorPort.getMonitorPort, payload);
      yield put({type: 'getPortList', payload: puzzle});

    },

    * delPort({payload}, {call, select, put}) {
      // const portList = yield  select(state => state)
      console.log(payload)
      const puzzle = yield call(monitorPort.delPort, payload);
      console.log(puzzle)
    },

  },
  reducers: {
    setLoading(state, {payload: portList}) {
      return {
        portList: portList,
        portListLoading: true
      };
    },
    getPortList(state, {payload: portList}) {
      return {
        portList: portList.data,
        portListLoading: false
      };
    },
  },
};
