// 负责导出具体业务
import { dispatchMethod } from "./networkClient";
import { config } from "./networkConfig";

//登录
let login = (value) => {
    return dispatchMethod(config.method.POST, config.path.login, `?username=${value.username}&&password=${value.password}`)
}
//用户信息查询
let userList = (value) => {
    return dispatchMethod(config.method.GET, config.path.userList, `?pageSize=${value.pageSize}&&pageNum=${value.pageNum}`)
}
//订单信息查询
let orderList = (value) => {
    return dispatchMethod(config.method.GET, config.path.orderList, `?pageSize=${value.pageSize}&&pageNum=${value.pageNum}`)
}
//商品信息查询
let productList = (value) => {
    return dispatchMethod(config.method.GET, config.path.productList, `?pageSize=${value.pageSize}&&pageNum=${value.pageNum}`)
}
//统计接口查询
let statistic = () => {
    return dispatchMethod(config.method.GET, config.path.statistic, '')
}
//品类信息查询
let categoryList = (value) => {
    return dispatchMethod(config.method.GET, config.path.categoryList, `?categoryId=${value.categoryId}`)
}
//按订单id查找
let orderIdSearch = (value) => {
    return dispatchMethod(config.method.GET, config.path.orderIdSearch, `?orderNo=${value.orderNo}`)
}
//订单详情查询
let orderDetails = (value) => {
    return dispatchMethod(config.method.GET, config.path.orderDetails, `?orderNo=${value.orderNo}`)
}
//添加品类接口
let addCategory = (value) => {
    return dispatchMethod(config.method.POST, config.path.addCategory, `?parentId=${value.parentId}&&categoryName=${value.categoryName}`)
}
//修改品类接口
let changeCategory = (value) => {
    return dispatchMethod(config.method.POST, config.path.changeCategory, `?categoryId=${value.categoryId}&&categoryName=${value.categoryName}`)
}
//查找品类子集接口
let getDeepCategory = (value) => {
    return dispatchMethod(config.method.GET, config.path.getDeepCategory, `?categoryId=${value.categoryId}`)
}
//按商品名称查找接口
let productSearchName = (value) => {
    return dispatchMethod(config.method.GET, config.path.productSearch, `?productName=${value.productName}&&pageSize=${value.pageSize}&&pageNum=${value.pageNum}`)
}
//按商品id查找接口
let productSearchId = (value) => {
    return dispatchMethod(config.method.GET, config.path.productSearch, `?productId=${value.productId}`)
}
//查看商品详情接口
let productDetails = (value) => {
    return dispatchMethod(config.method.GET, config.path.productDetails, `?productId=${value.productId}`)
}
//修改商品售卖状态接口
let productSoldOut = (value) => {
    return dispatchMethod(config.method.POST, config.path.productSoldOut, `?productId=${value.productId}&&status=${value.status}`)
}
//更新商品接口
let productUpdate = (value) => {
    return dispatchMethod(config.method.POST, config.path.productSaveUpdate, `?categoryId=${value.productId}&&name=${value.name}&&subtitle=${value.subtitle}&&detail=${value.detail}&&price=${value.price}&&stock=${value.stock}&&status=${value.status}&&id=${value.id}`)
}
//添加商品接口
let productSave = (value) => {
    return dispatchMethod(config.method.POST, config.path.productSaveUpdate, `?categoryId=${value.productId}&&name=${value.name}&&subtitle=${value.subtitle}&&detail=${value.detail}&&price=${value.price}&&stock=${value.stock}&&status=${value.status}`)
}


// //上传图片接口
// let productImage = (value) => {
//     return dispatchMethod(config.method.GET, config.path.productImage, `?productId=${value.productId}`)
// }
// //富文本上传图片接口
// let productRichtext = (value) => {
//     return dispatchMethod(config.method.GET, config.path.productRichtext, `?productId=${value.productId}`)
// }

const business = {
    login,
    userList,
    orderList,
    productList,
    statistic,
    categoryList,
    orderIdSearch,
    orderDetails,
    addCategory,
    changeCategory,
    getDeepCategory,
    productSearchName,
    productSearchId,
    productDetails,
    productSoldOut,
    productUpdate,
    productSave
}
export default business