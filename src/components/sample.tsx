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
	} = list.node;

	let Title = (
		<Link
			aria-labelledby="文章标题"
			key="title"
			className="sample-item-title"
			to={`/${layout}/${
				date ? date : formatDateForPath(fileAbsolutePath)
			}/${title}`}>
			<h5>{title}</h5>
		</Link>
	);
	if (isDetail) {
		Title = (
			<h1 aria-labelledby="文章标题" key="title" className="sample-item-title">
				{title}
			</h1>
		);
	}

	return [
		<div className="sample-item-top" key="top">
			<span className="sample-date" aria-labelledby="日期">
				{formatDate(date)}
			</span>
			<div aria-labelledby="文章标签" className="sample-tags">
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
		Title,
		<p
			aria-labelledby="文章简介"
			key="description"
			className="sample-item-desc">
			{description}
		</p>,
	];
};

const SampleLi = ({ list, tag }: List) => {
	const { id } = list.node;
	return (
		<li key={id} className="sample-item">
			{listItem(list, false, tag)}
		</li>
	);
};

export const SampleDiv = ({ list }: List) => {
	const { id } = list.node;
	return (
		<div key={id} className="sample-item">
			{listItem(list, true)}
		</div>
	);
};

export default SampleLi;
