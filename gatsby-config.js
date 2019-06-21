const sourceFileSystem = [
	{
		name: `images`, // 图片
		path: `${__dirname}/posts/images`,
	},
	{
		name: `posts`, // 文章
		path: `${__dirname}/posts`,
	},
	{
		name: `data`, // 数据
		path: `${__dirname}/src/data`,
	},
].map(options => ({
	resolve: `gatsby-source-filesystem`,
	options,
}));

module.exports = {
	siteMetadata: {
		title: `Quiet - Blog`,
		description: `愿生活不为五斗米折腰 - Web前端开发博客`,
		author: `zhouyuexie`,
		siteUrl: 'https://www.QuietBoy.net',
	},
	plugins: [
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-offline`,
		`gatsby-plugin-typescript`,
		`gatsby-transformer-yaml`,
		...sourceFileSystem,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Quiet`,
				short_name: `Quiet`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/assets/images/QuietBoy.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: `/site.xml`,
				sitemapSize: 5000,
				exclude: ['/404'],
				query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
			},
		},
		{
			resolve: `gatsby-remark-prismjs`,
			options: {
				classPrefix: 'language-',
				inlineCodeMarker: null,
				showLineNumbers: true,
				noInlineHighlight: true,
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				excerpt_separator: `<!-- end -->`,
				plugins: [
					`gatsby-remark-graphviz`,
					`gatsby-remark-prismjs`,
					{
						resolve: `gatsby-remark-katex`,
						options: {
							// Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
							strict: `ignore`,
						},
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: {
							destinationDir: 'link',
						},
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
							quality: 80,
							showCaptions: true,
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				// Setting a color is optional.
				color: `#435466`,
				// Disable the loading spinner.
				showSpinner: false,
			},
		},
		{
			resolve: 'gatsby-plugin-page-progress',
			options: {
				includePaths: ['/', { regex: '^/posts' }],
				height: 3,
				prependToBody: true,
				color: `#663399`,
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: '',
				// Defines where to place the tracking script - `true` in the head and `false` in the body
				head: false,
				// Setting this parameter is optional
				anonymize: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				exclude: [],
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							const { siteUrl } = site.siteMetadata;
							return allMarkdownRemark.edges.map(edge => {
								const { date, layout, title } = edge.node.frontmatter;
								const url = `${siteUrl}/${layout}/${date}/${title}`;

								return Object.assign({}, edge.node.frontmatter, {
									url,
									guid: url,
									custom_elements: [{ 'content:encoded': edge.node.html }],
								});
							});
						},
						query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { draft: { in: [false, null] } } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        layout
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
						output: '/feed.xml',
						title: 'Quiet RSS Feed',
						match: '^/posts/',
					},
				],
			},
		},
	],
};
