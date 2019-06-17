import React from 'react';
import ReactPaginate from 'react-paginate';
import { graphql, navigate } from 'gatsby';

import PostLi from '../components/post';
import Layout from '../components/layout';
import { getActiveLayout } from '../utils/config';

interface Props {
	data: Post.Lists & Config.DataYaml;
	pageContext: {
		page: number;
		limit: number;
		skip: number;
		url: string;
	};
}
type Lists = {
	node: Post.CommonInfo;
}[];
interface State {
	page: number;
	size: number;
	lists: Lists;
	totalCount: number;
}

const createLists = (lists: Lists) => {
	const result: JSX.Element[] = [];
	for (let list of lists) {
		const { id } = list.node;
		result.push(<PostLi tag="" key={id} list={list} />);
	}
	return result;
};

export default class BlogPostList extends React.Component<Props, State> {
	state = {
		page: 0,
		size: 5,
		lists: [],
		totalCount: 10,
	};
	componentWillMount() {
		const { edges: lists, totalCount } = this.props.data.allMarkdownRemark;
		const { page, limit: size } = this.props.pageContext;

		this.setState({
			lists,
			page: page ? page : 0,
			size,
			totalCount,
		});
	}
	render() {
		const { page, size, totalCount, lists } = this.state;
		const pageCount = Math.ceil(totalCount / size);

		return (
			<Layout className="posts-lists" title="首页">
				<ul className="content" aria-labelledby="文章列表">
					{createLists(lists)}
				</ul>
				<p className="lists-tip" hidden={lists.length === size}>
					到底啦~
				</p>
				<ReactPaginate
					pageCount={pageCount}
					pageRangeDisplayed={size}
					marginPagesDisplayed={3}
					previousLabel={'上一页'}
					initialPage={page}
					nextLabel={'下一页'}
					onPageChange={this.handlePageClick.bind(this)}
					containerClassName={'pagination'}
				/>
			</Layout>
		);
	}
	handlePageClick(data: { selected: number }) {
		const page = data.selected + 1;
		if (page === 1) {
			navigate('/');
			return;
		}

		navigate(
			this.getUrl({
				page: String(page),
			})
		);
	}
	getUrl(data: { [key: string]: string }) {
		const { createPageConfig } = this.props.data.dataYaml;
		const { listPath } = getActiveLayout(createPageConfig);

		return listPath.replace(/:\w+/g, (match: string) => data[match.slice(1)]);
	}
}

export const query = graphql`
	query PostListQuery($skip: Int, $limit: Int) {
		allMarkdownRemark(
			filter: { frontmatter: { draft: { in: [false, null] } } }
			limit: $limit
			skip: $skip
			sort: { order: DESC, fields: frontmatter___date }
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
					fileAbsolutePath
					wordCount {
						words
					}
					timeToRead
				}
			}
		}
		dataYaml {
			createPageConfig {
				activeLayout
				posts {
					listPath
				}
			}
		}
	}
`;
