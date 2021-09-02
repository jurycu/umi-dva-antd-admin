let portList = [{
  "interval_time": "300",
  "ip": "11.22.11.11\n11.22.11.112",
  "is_on": "acmp",
  "monitor_name": "xxx",
  "port": "90\n90",
  "remark": "测试"
},

  {
    "interval_time": "300",
    "ip": "11.22.11.11\n11.22.11.112",
    "is_on": "acmp",
    "monitor_name": "测试",
    "port": "90\n90",
    "remark": "测试"
  },


]

export default {
  // 支持值为 Object 和 Array
  // 'GET /api/users': users,

  // GET 可忽略
  // '/api/users/1': {id: 1},

  // 支持自定义函数，API 参考 express@4
  'POST /api/monitor/search': (req, res) => {
    // console.log(req)
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');

    const {body} = req
    const search = body.searchName
    if (search === "") {
      return  res.status(200).json({"data":portList,"success":true,"total":portList.length})
    } else {
      let returnJson = []
      for (let it of portList) {
        if (it.monitor_name.indexOf(search) !== -1 || it.port.indexOf(search) !== -1 || it.ip.indexOf(search) !== -1 || it.remark.indexOf(search) !== -1) {
          returnJson.push(it)
        }
      }
      return res.status(200).json({"data":returnJson,"success":true,"total":returnJson.length})

    }

  },
  'POST /api/monitor/add': (req, res) =>{
    const {body} = req
    portList.push(body)
    return res.status(200).json({"data":"OK！","success":true,"total":1})
  },

  'PUT /api/monitor/update': (req, res) =>{
    const {body} = req
    const returnJson = []
    for (let it of portList) {
      if ( it.monitor_name.indexOf(body.monitor_name) !== -1 ) {
        it.interval_time = body.interval_time
        it.ip = body.ip
        it.is_on = body.is_on
        it.remark = body.remark
        it.port = body.port
        returnJson.push(it)
      }else {
        returnJson.push(it)
      }
    }
    portList = returnJson
    return res.status(200).json({"data":"OK！","success":true,"total":1})
  },
  'DELETE /api/monitor/delete': (req, res) =>{
    const {body} = req
    const returnJson = []
    for (let it of portList) {
      let isHave = false
      for (let d of body.delName){
        if ( it.monitor_name.indexOf(d) !== -1 ) {
          isHave = true
        }
      }
      if (!isHave){
        returnJson.push(it)
      }

    }
    portList = returnJson
    return res.status(200).json({"data":returnJson,"success":true,"total":returnJson.length})
  }
}
