import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

type TagsNumber = {
	[key: string]: number;
};
type TagsTitle = {
	[key: string]: {
		title: string;
		date: string;
		url: string;
	}[];
};
interface Props {
	data: Post.Lists & Config.DataYaml;
}
interface State {
	tagsNumber: TagsNumber;
	tagsTitle: TagsTitle;
}

export default class BlogPostList extends React.Component<Props, State> {
	state: {
		tagsNumber: TagsNumber;
		tagsTitle: TagsTitle;
	} = {
		tagsNumber: {},
		tagsTitle: {},
	};
	componentWillMount() {
		this.init();
	}
	render() {
		const { tagsNumber, tagsTitle } = this.state;
		return (
			<Layout className="posts-tags" title="标签">
				<div className="tags-filter">
					<input
						onChange={this.onChange.bind(this)}
						placeholder="搜索标签..."
						type="text"
					/>
				</div>
				<div className="tags-index">
					<ul aria-labelledby="标签索引">
						{Object.keys(tagsNumber).map(tag => (
							<li key={tag}>
								<a href={`#${tag}`}>
									<span>{tag}</span>
									<span className="count">{tagsNumber[tag]}</span>
								</a>
							</li>
						))}
					</ul>
				</div>
				<article>
					{Object.keys(tagsTitle).map(tag => [
						<h3 id={tag} key={`${tag}-title`} className="tag-title">
							{tag}
						</h3>,
						<ul key={`${tag}-list`} className="tag-posts">
							{tagsTitle[tag].map(({ title, url }) => (
								<li key={title}>
									<Link to={url}>{title}</Link>
								</li>
							))}
						</ul>,
					])}
				</article>
			</Layout>
		);
	}
	init() {
		const { edges: lists } = this.props.data.allMarkdownRemark;
		const tagsNumber: TagsNumber = {};
		const tagsTitle: TagsTitle = {};

		for (let { node } of lists) {
			const { date, title, tags } = node.frontmatter;

			for (let tag of tags) {
				tagsNumber[tag] = tagsNumber[tag] ? tagsNumber[tag] + 1 : 1;
				if (tagsTitle[tag]) {
					tagsTitle[tag].push({
						title,
						date,
						url: this.getUrl({
							title,
							date,
						}),
					});
				} else {
					tagsTitle[tag] = [
						{
							title,
							date,
							url: this.getUrl({
								title,
								date,
							}),
						},
					];
				}
			}
		}

		this.setState({
			tagsNumber,
			tagsTitle,
		});
	}
	getUrl(data: { [key: string]: string }) {
		const { activeLayout } = this.props.data.dataYaml.createPageConfig;
		const { detailPath } = this.props.data.dataYaml.createPageConfig[
			activeLayout
		];

		return detailPath.replace(/:\w+/g, (match: string) => data[match.slice(1)]);
	}
	onChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		const reg = new RegExp(value, 'g');

		const { edges: lists } = this.props.data.allMarkdownRemark;
		const tagsNumber: TagsNumber = {};

		for (let { node } of lists) {
			const { tags } = node.frontmatter;

			for (let tag of tags) {
				if (!reg.test(tag)) continue;

				tagsNumber[tag] = tagsNumber[tag] ? tagsNumber[tag] + 1 : 1;
			}
		}

		this.setState({
			tagsNumber,
		});
	}
}

export const pageQuery = graphql`
	query {
		allMarkdownRemark(
			filter: { frontmatter: { draft: { in: [false, null] } } }
		) {
			edges {
				node {
					frontmatter {
						tags
						title
						date
					}
				}
			}
		}
		dataYaml {
			createPageConfig {
				activeLayout
				posts {
					detail
					detailPath
					homePath
					list
					listPath
					tag
					tagPath
				}
			}
		}
	}
`;
