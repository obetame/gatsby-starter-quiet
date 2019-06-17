import React from 'react';
import { graphql, Link } from 'gatsby';

import SampleLi from '../components/sample';
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
		result.push(<SampleLi tag="" key={id} list={list} />);
	}
	return result;
};

export default class SampleList extends React.Component<Props, State> {
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
		const { page, size, lists, totalCount } = this.state;
		const totalPage = Math.ceil(totalCount / size);
		const currentPage = page + 1;

		return (
			<Layout className="sample-lists" title="首页">
				<ul className="content" aria-labelledby="文章列表">
					{createLists(lists)}
				</ul>
				<p
					className="lists-tip"
					hidden={lists.length === size ? true : undefined}>
					到底啦~
				</p>
				<div className="pagination">
					<Link
						className="prev"
						hidden={currentPage === 1}
						to={this.getUrl({ page: String(page) })}>
						上一页
					</Link>
					<Link
						className="next"
						hidden={currentPage === totalPage}
						to={this.getUrl({ page: String(currentPage + 1) })}>
						下一页
					</Link>
				</div>
			</Layout>
		);
	}
	getUrl(data: { [key: string]: string }) {
		if (data['page'] && data['page'] === '1') return '/';

		const { createPageConfig } = this.props.data.dataYaml;
		const { listPath } = getActiveLayout(createPageConfig);

		return listPath.replace(/:\w+/g, (match: string) => data[match.slice(1)]);
	}
}

export const query = graphql`
	query SampleListQuery($skip: Int, $limit: Int) {
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
