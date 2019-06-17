import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import { PostDiv } from '../components/post';
import renderAst from '../utils/renderAst';
import { formatDateForPath } from '../utils/date';

const Reship = styled.i`
	font-size: 12px;
	font-weight: 900;
`;

export default function BlogPostDetail(props: {
	data: Post.Detail;
	title: string;
	date: string;
}) {
	const { markdownRemark: post } = props.data; // data.markdownRemark holds our post data
	const {
		fileAbsolutePath,
		frontmatter: { layout, date, title },
	} = post;

	return (
		<Layout
			className="posts-detail"
			title={post.frontmatter.title}
			meta={[
				{
					content: `/${layout}/${
						date ? date : formatDateForPath(fileAbsolutePath)
					}/${title}`,
					property: 'og:url',
				},
			]}
			description={post.frontmatter.description}>
			<div className="posts-lists">
				<PostDiv list={{ node: post }} />
			</div>
			<article className="posts-detail-content">
				{renderAst(post.htmlAst)}
			</article>
			<p className="reship">
				<Reship>
					个人随笔记录,内容不保证完全正确,若需要转载,请注明作者和出处.
				</Reship>
			</p>
		</Layout>
	);
}

export const pageQuery = graphql`
	query BlogPostByTitle($title: String!, $date: Date!) {
		markdownRemark(
			frontmatter: {
				title: { eq: $title }
				date: { eq: $date }
				draft: { in: [false, null] }
			}
		) {
			frontmatter {
				date
				description
				tags
				layout
				title
			}
			fileAbsolutePath
			html
			htmlAst
			wordCount {
				paragraphs
				sentences
				words
			}
			timeToRead
			id
		}
	}
`;
