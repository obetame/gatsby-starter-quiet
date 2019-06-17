import React from 'react';
import { Link } from 'gatsby';
import { formatDate, formatDateForPath } from '../utils/date';

interface List {
	list: {
		node: Post.CommonInfo;
	};
	tag?: string;
}

const listItem = (
	list: {
		node: Post.CommonInfo;
	},
	isDetail = false,
	tag = ''
) => {
	const {
		frontmatter: { layout, date, title, description, tags = [] },
		fileAbsolutePath,
		timeToRead,
	} = list.node;

	let Title = (
		<Link
			aria-labelledby="文章标题"
			key="title"
			className="posts-item-title"
			to={`/${layout}/${
				date ? date : formatDateForPath(fileAbsolutePath)
			}/${title}`}>
			<h5>{title}</h5>
		</Link>
	);
	if (isDetail) {
		Title = (
			<h1 aria-labelledby="文章标题" key="title" className="posts-item-title">
				{title}
			</h1>
		);
	}

	return [
		Title,
		<p aria-labelledby="文章简介" key="description" className="posts-item-desc">
			{description}
		</p>,
		<div className="posts-item-footer" key="footer">
			<span className="posts-date" aria-labelledby="日期">
				{formatDate(date)}
			</span>
			<span aria-hidden="true" className="divider">
				-
			</span>
			<span
				className="posts-read-time"
				aria-labelledby={`阅读需要 ${timeToRead} 分钟`}>
				阅读需要 {timeToRead} 分钟
			</span>
			<span aria-hidden="true" className="divider">
				-
			</span>
			<div aria-labelledby="文章标签" className="posts-tags">
				{tags.map(t => (
					<Link
						key={t}
						className={t === tag ? 'highlight' : undefined}
						to={`/tags/${t}`}>
						{t.toUpperCase()}
					</Link>
				))}
			</div>
		</div>,
	];
};

const PostLi = ({ list, tag }: List) => {
	const { id } = list.node;
	return (
		<li key={id} className="posts-item">
			{listItem(list, false, tag)}
		</li>
	);
};

export const PostDiv = ({ list }: List) => {
	const { id } = list.node;
	return (
		<div key={id} className="posts-item">
			{listItem(list, true)}
		</div>
	);
};

export default PostLi;
