const GET = 'GET';
const POST = 'POST';

export const config = {
    method: {
        GET,
        POST
    },
    path: {
        login: '/ask/user/login.do',
        userList: '/ask/user/list.do',
        orderList: '/ask/order/list.do',
        orderIdSearch:'/ask/order/search.do',
        orderDetails:'/ask/order/detail.do',
        productList: '/ask/product/list.do',
        productSearch: '/ask/product/search.do',
        productDetails: '/ask/product/detail.do',
        productSoldOut: '/ask/product/set_sale_status.do',
        productSaveUpdate: '/ask/product/save.do',
        productImage: '/ask/product/upload.do',
        productRichtext: '/ask/product/richtext_img_upload.do',
        statistic: '/ask/statistic/base_count.do',
        categoryList: '/ask/category/get_category.do',
        addCategory:'/ask/category/add_category.do',
        changeCategory:'/ask/category/set_category_name.do',
        getDeepCategory:'/ask/category/get_deep_category.do',
        register: '',
    },
}