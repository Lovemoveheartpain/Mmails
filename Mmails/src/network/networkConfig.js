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
        productList: '/ask/product/list.do',
        statistic: '/ask/statistic/base_count.do',
        categoryList: '/ask/category/get_category.do',
        register: '',
    },
}