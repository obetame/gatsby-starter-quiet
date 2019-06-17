import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const About = () => (
	<Layout className="about" title="关于我">
		<h2>关于我~</h2>
		<p>本人是一名Web前端工程师,现居成都</p>
		<p>
			关于写作我认为一般人能看懂、没有歧义就可以了,技术文章需要的是严谨,其次是流畅,按照写文档的习惯来写就差不多啦.
		</p>
		<p>能让我坚持写博客是由于以下几点原因:</p>
		<ul>
			<li>锻炼写作能力与表达能力(虽然目前还是很糟糕)</li>
			<li>写的过程中能温故知新,发现知识盲区</li>
			<li>方便后续查看</li>
			<li>喜欢折腾新的技术(跟我经常逛medium有关)</li>
			<li>属于自己的时间毕竟多(否则哪来时间充电)</li>
		</ul>
		<p>
			总结来说就是:写博客这个东西不全是为了“造福社会”(当然也是有的),更是为了锻炼自己的写作能力与表达能力,把自己懂的或者说半懂的东西写出来,你能发现自己的知识盲区,迫使自己去查找资料学习新的东西.而且博客可以记录自己曾经学过的东西,不是每个人都能里记得住所有学过的东西,当你往后回顾那些知识点的时候,可能会有新的感悟,就算是温故而知新了吧.
		</p>
		<p>
			目前除了基本的Vue、React这类技术栈,有时候还会写点Python、Rust这类文章(基础的比较多)
		</p>
		<Link className="goback" to="/">
			看完了该返回首页了吧
		</Link>
	</Layout>
);

export default About;
