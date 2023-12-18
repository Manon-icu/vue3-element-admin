const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const Banner = () => import('@/views/banner/index.vue')
const Album = () => import('@/views/album/index.vue')
const Team = () => import('@/views/team/index.vue')
const Course = () => import('@/views/course/index.vue')
const Training = () => import('@/views/training/index.vue')
const News = () => import('@/views/news/index.vue')
const file = () => import('@/views/file/index.vue')

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
      //   children:[
      //     {
      //       meta: {
      //         title: '文件列表',
      //       },
      //         path:'/file/:id', 
      //       name: 'file',
      //       component: file,
      //     }
      // ]
      },
      {
        path: '/my-team',
        name: 'myTeam',
        component: Team,
        meta: {
          title: '我的团队',
          affix: true,
        },
      },
      {
        path: '/develop-course',
        name: 'deveCourse',
        component: Course,
        meta: {
          title: '发展历程',
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
      {
        path: '/file/:id',
        name: 'file',
        component: file,
        meta: {
          title: '文件列表',
          affix: true,
        },
      },
    ],
  },
]
