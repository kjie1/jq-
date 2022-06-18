// 热门关键词
Mock.mock('/hotwords', {
    'result|8-15' :[{
        word: '@cword(2,5)',
        href: '@url(http)'
    }]
});

// 推荐的热门关键词

Mock.mock('/recommendWords', {
    word: '@cword(2,5)',
    href: '@url(http)'
})