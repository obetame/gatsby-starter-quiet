import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const NotFoundPage = () => (
	<Layout className="404" title="404">
		<h2>NOT FOUND</h2>
		<p>你来到了未知领域,没人知道你是怎么进来的...</p>
		<Link to="/">回到正常世界</Link>
	</Layout>
);

export default NotFoundPage;
