import React from 'react';
import { graphql } from 'gatsby';

import PostLi from '../components/post';
import Layout from '../components/layout';

interface Props {
	data: Post.Lists;
	pageContext: {
		url: string;
		tag: string;
	};
}
type Lists = {
	node: Post.CommonInfo;
}[];
interface State {
	lists: Lists;
}

const createLists = (lists: Lists, tag: string) => {
	const result: JSX.Element[] = [];
	for (let list of lists) {
		const { id } = list.node;
		result.push(<PostLi tag={tag} key={id} list={list} />);
	}
	return result;
};

export default class BlogPostTag extends React.Component<Props, State> {
	state = {
		lists: [],
	};
	componentWillMount() {
		const { edges: lists } = this.props.data.allMarkdownRemark;

		this.setState({
			lists,
		});
	}
	render() {
		const { lists } = this.state;
		const { tag } = this.props.pageContext;

		return (
			<Layout className="posts-lists" title={tag}>
				<ul>{createLists(lists, tag)}</ul>
				<p className="lists-tip">共{lists.length}条数据</p>
			</Layout>
		);
	}
}

export const pageQuery = graphql`
	query BlogPostTagQuery($tag: [String]!) {
		allMarkdownRemark(
			sort: { order: DESC, fields: frontmatter___date }
			filter: {
				frontmatter: { tags: { in: $tag }, draft: { in: [false, null] } }
			}
		) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						date
						description
						layout
						tags
						title
					}
					wordCount {
						words
					}
					timeToRead
				}
			}
		}
	}
`;
