// 负责导出具体业务
import { dispatchMethod } from "./networkClient";
import { config } from "./networkConfig";

let login = (value) => {
    return dispatchMethod(config.method.POST, config.path.login, `?username=${value.username}&&password=${value.password}`)
}
let userList = (value) => {
    return dispatchMethod(config.method.POST, config.path.userList, `?pageSize=${value.pageSize}&&pageNum=${value.pageNum}`)
}
let orderList = (value) => {
    return dispatchMethod(config.method.POST, config.path.orderList, `?pageSize=${value.pageSize}&&pageNum=${value.pageNum}`)
}
let productList = (value) => {
    return dispatchMethod(config.method.POST, config.path.productList, `?pageSize=${value.pageSize}&&pageNum=${value.pageNum}`)
}
let statistic = () => {
    return dispatchMethod(config.method.GET, config.path.statistic, '')
}
let categoryList = (value) => {
    return dispatchMethod(config.method.POST, config.path.categoryList, `?categoryId=${value.categoryId}`)
}

const business = {
    login,
    userList,
    orderList,
    productList,
    statistic,
    categoryList
}
export default business