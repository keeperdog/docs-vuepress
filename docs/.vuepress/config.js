const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Micro Frontend - qiankun",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  dest: "./docs/dist",
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: true,
    displayAllHeaders: true,
    logo:
      "https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png",
    nav: [
      // {
      //   text: "大前端",
      //   link: "/guide/",
      // },
      {
        text: "Micro Frontend",
        link: "/autodesk/",
      },
      // {
      //   text: "Config",
      //   link: "/config/",
      // },
      {
        text: "VuePress",
        link: "https://v1.vuepress.vuejs.org",
      },
    ],
    sidebar: {
      "/autodesk/": [
        {
          title: "目录",
          collapsable: false,
          children: ["", "micro-frontend"],
        },
      ],
      "/guide/": [
        {
          title: "目录",
          collapsable: false,
          children: [
            "",
            "java-script",
            "react",
            "hld-design",
            "performance",
            "http",
            "browser",
            "security",
            "webpack",
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
