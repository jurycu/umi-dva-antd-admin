let users = [{
  "dep": "设计体验部",
  "empId": "11036",
  "name": "小陈",
  "role": "admin"
}, {
  "dep": "运维部",
  "empId": "1311802",
  "name": "晓明",
  "role": "admin"
}, {
  "dep": "测试部",
  "empId": "22063314",
  "name": "大鼓",
  "role": "general"
}, {
  "dep": "人力资源部",
  "empId": "4112121",
  "name": "小明",
  "role": "admin"
},]


export default {
  // 支持值为 Object 和 Array
  'GET /api/users': users,

  // GET 可忽略
  '/api/users/1': {id: 1},

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/search': (req, res) => {
    // console.log(req)
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');

    const {body} = req
    const search = body.searchName
    if (search === "") {
      return  res.status(200).json({"data":users,"success":true,"total":users.length})
    } else {
      let returnJson = []
      for (let it of users) {
        if (it.role.indexOf(search) !== -1 || it.empId.indexOf(search) !== -1 || it.dep.indexOf(search) !== -1 || it.name.indexOf(search) !== -1) {
          returnJson.push(it)
        }
      }
      return res.status(200).json({"data":returnJson,"success":true,"total":returnJson.length})

    }

  },
  'POST /api/users/add': (req, res) =>{
    const {body} = req
    users.push(body)
    return res.status(200).json({"data":"OK！","success":true,"total":1})
  },

  'PUT /api/users/update': (req, res) =>{
    const {body} = req
    for (let it of users) {
      if ( it.empId.indexOf(body.empId) !== -1 ) {
        it.role = body.role
      }
    }
    return res.status(200).json({"data":"OK！","success":true,"total":1})
  },

  'DELETE /api/users/delete': (req, res) =>{
    const {body} = req
    const returnJson = []
    for (let it of users) {
      if ( it.empId.indexOf(body.empId) === -1 ) {
        returnJson.push(it)
      }
    }
    users = returnJson
    return res.status(200).json({"data":returnJson,"success":true,"total":returnJson.length})
  }
}
