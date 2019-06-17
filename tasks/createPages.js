const {
	getComponentPath,
	getLayoutConfig,
	fillParams,
	formatDateForPath,
} = require('./common');

const reqLists = async (graphql, type = 'list') => {
	const postsData = await graphql(`
		{
			allMarkdownRemark(
				filter: { frontmatter: { draft: { in: [false, null] } } }
				sort: { fields: frontmatter___date }
			) {
				edges {
					node {
						timeToRead
						wordCount {
							words
							paragraphs
							sentences
						}
						id
						frontmatter {
							title
							tags
							layout
							description
							date
						}
						fileAbsolutePath
					}
				}
				totalCount
			}
			dataYaml {
				page {
					size
				}
				createPageConfig {
					activeLayout
					posts {
						homePath
						detail
						detailPath
						list
						listPath
						tag
						tagPath
					}
					# you can add other layout in underside
					# custom {
					#   homePath
					#   ...
					# }
					sample {
						list
					}
				}
			}
		}
	`);

	const {
		allMarkdownRemark: { edges: lists },
		dataYaml: { createPageConfig },
	} = postsData.data;
	const { size } = postsData.data.dataYaml.page;
	const { activeLayout } = createPageConfig;
	const component = getComponentPath(createPageConfig, activeLayout, type);
	const layoutConfig = getLayoutConfig(createPageConfig, activeLayout);

	return {
		lists,
		createPageConfig,
		activeLayout,
		size,
		component,
		layoutConfig,
	};
};

exports.blogPostDetail = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const { lists, createPageConfig, size } = await reqLists(graphql, 'detail');

	for (let { node } of lists) {
		let { date, title, layout } = node.frontmatter;
		if (!date) {
			date = formatDateForPath(node.fileAbsolutePath);
		}
		const { detailPath } = getLayoutConfig(createPageConfig, layout);

		const path = fillParams(detailPath, {
			date,
			title,
		});

		createPage({
			path,
			component: getComponentPath(createPageConfig, layout, 'detail'),
			context: {
				...node.frontmatter,
				// date,
			}, // additional data can be passed via context
		});
	}
};

exports.blogPostList = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const {
		lists,
		createPageConfig,
		activeLayout,
		size,
		component,
		layoutConfig: { listPath, homePath },
	} = await reqLists(graphql);

	Array(Math.ceil(lists.length / size))
		.fill(0)
		.forEach((v, page) => {
			const path = fillParams(listPath, {
				page: page + 1,
			});
			const context = {
				page,
				skip: page * size,
				limit: size,
				url: listPath,
			};
			createPage({
				path: path === homePath ? '/' : path,
				component,
				context,
			});
		});
};

exports.blogPostTags = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const {
		lists,
		createPageConfig,
		activeLayout,
		size,
		component,
		layoutConfig: { tagPath },
	} = await reqLists(graphql, 'tag');
	const tagsLists = Array.from(
		new Set(
			lists.reduce((acc, { node }) => acc.concat(node.frontmatter.tags), [])
		)
	);

	// single tag page
	// /tags/xxxx
	for (let tag of tagsLists) {
		createPage({
			path: fillParams(tagPath, {
				tag,
			}),
			component,
			context: {
				tag,
				url: tagPath,
			}, // additional data can be passed via context
		});
	}
};
