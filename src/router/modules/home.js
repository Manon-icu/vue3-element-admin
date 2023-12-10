const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const Banner = () => import('@/views/banner/index.vue')
const Album = () => import('@/views/album/index.vue')
const About = () => import('@/views/about/index.vue')
const Team = () => import('@/views/team/index.vue')
const Training = () => import('@/views/training/index.vue')
const News = () => import('@/views/news/index.vue')

export default [
  {
    path: '/home',
    component: Layout,
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
    },
    icon: 'icon-home',
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          affix: true,
        },
      },
      {
        path: '/banner',
        name: 'banner',
        component: Banner,
        meta: {
          title: 'Banner',
          affix: true,
        },
      },
      {
        path: '/album',
        name: 'album',
        component: Album,
        meta: {
          title: '相册',
          affix: true,
        },
      },
      {
        path: '/about-us',
        name: 'about us',
        component: About,
        meta: {
          title: '关于我们',
          affix: true,
        },
      },
      {
        path: '/my-team',
        name: 'my team',
        component: Team,
        meta: {
          title: '我的团队',
          affix: true,
        },
      },
      {
        path: '/training-course',
        name: 'Training course',
        component: Training,
        meta: {
          title: '培训课程',
          affix: true,
        },
      },
      {
        path: '/news',
        name: 'News',
        component: News,
        meta: {
          title: '新闻资讯',
          affix: true,
        },
      },
    ],
  },
]
