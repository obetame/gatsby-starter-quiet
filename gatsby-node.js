/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const {
	blogPostDetail,
	blogPostList,
	blogPostTags,
} = require('./tasks/createPages');

exports.createPages = async ({ actions, graphql }) => {
	// create posts page
	await blogPostDetail({ actions, graphql });
	await blogPostList({ actions, graphql });
	await blogPostTags({ actions, graphql });
};
