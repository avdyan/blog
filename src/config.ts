export const SITE = {
  website: "https://devosfera.com/", // replace this with your deployed domain
  author: "Andrés Ujpán",
  profile: "https://andressable.vercel.app/",
  desc: "A blog to share my thoughts and projects meanwhile learning some new stuff.",
  title: "Devosfera",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/avdyan/blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "es", // html lang code. Set this empty and default will be "en"
  timezone: "America/Guatemala", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
