// 模拟 menu接口  返回数据案例
// {data: [{
//     title: [{
//         name: '家用电器',
//         href: '#'
//     }],
//     content: {
//         tabs: [{
//             name: '家电馆',
//             href: '#'
//         }, {
//             name: '家电专卖店',
//             href: '#'
//         }],
//         details: [{
//             category: '电视',
//             items: [{
//                 name:'超薄电视',
//                 href: '#'
//             }, {
//                 name: '全面屏电视',
//                 href: '#'
//             }]
//         }]
//     }
// }]}
Mock.mock("/menu", {
    // 18代表的是数组的长度
    'data|18': [{
        // 2-4 代表数组长度在2-4范围内
        'titles|2-4': [{
            // @cword(2,4) 代表的是随机生成2-4个汉字
            name: '@cword(2,4)',
            // 随机生成一个http的链接地址
            href: '@url(http)'
        }],
        content: {
            'tabs|2-5': [{
                name: '@cword(2,4)',
                href: '@url(http)'
            }],
            'details|8-15': [{
                category: '@cword(2,4)',
                'items|8-16': [{
                    href: '@url(http)',
                    name: '@cword(2,4)'
                }]
            }]
        }
    }]
})