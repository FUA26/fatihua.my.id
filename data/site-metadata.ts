export const SITE_METADATA = {
  title: `Fatih's Dev Space – sharing thoughts, lessons, and inspirations`,
  author: 'Fatih Ulil Albab',
  headerTitle: `Fatih's dev space`,
  description:
    'A simple log of my experiences and learnings in software development',
  language: 'en-us',
  locale: 'en-US',
  stickyNav: true,
  theme: 'light', // system, dark or light
  siteUrl: 'https://www.fatihua.my.id',
  siteRepo: 'https://github.com/FUA26/fatihua',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.jpeg`,
  email: 'fatihua@gmail.com',
  github: 'https://github.com/FUA26',
  linkedin: 'https://www.linkedin.com/in/fatihulilalbab',
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl:
        'https://cloud.umami.is/share/vtt0ibwcrqs5IIak/www.fatihua.my.id',
    },
  },
  comments: {
    giscusConfigs: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}
