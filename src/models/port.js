import * as monitorPort from '../service/monitor'
import Cookies from "js-cookie";

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
      const puzzle = yield call(monitorPort.delPort, payload);
      let mN = ""
      for (let m of payload.delName) {
        mN += m + "|"
      }
      if (puzzle.code !== 200) {
        if (payload.delName.length > 1) {
          recordAdd["action"] = "批量删除端口监控"
        }
      } else {
        if (payload.delName.length > 1) {
          recordAdd["action"] = "批量删除端口监控"
        }
      }
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
      const portListLoad = portList.data.load;
      return {
        portList: portListLoad,
        portListLoading: false
      };
    },
  },
};
