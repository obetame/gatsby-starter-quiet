import React from 'react';
import Prism from 'prismjs';
import GitHub from 'github-api';
import styled from 'styled-components';

const gh = new GitHub();

/**
 * https://developer.github.com/v3/gists/#get-a-single-gist
 */
type State = {
	created_at: string;
	description: string;
	files: {
		[key: string]: {
			content: string;
			filename: string;
			language: string;
		};
	};
	html_url: string;
	loading: boolean;
};
type Props = {
	gid: string;
};

const Loading = styled.div`
	min-height: 5rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	& p {
		font-size: 13px;
		color: var(--gray);
	}
`;
const Container = styled.div`
	& pre[class*='language-'] {
		max-height: 35rem;
		overflow-y: scroll;
		margin: 0;
		background: var(--gh-bg);
	}
	& code {
		white-space: pre-wrap;
	}
	& .title {
		margin: 0;
		text-align: center;
		display: block;
	}
`;

/**
 * request public gist
 * props: gid
 */
export default class Gist extends React.Component<Props, State> {
	state = {
		created_at: '',
		description: '',
		files: {},
		html_url: '',
		loading: true,
	};
	componentWillMount() {
		const { gid } = this.props;
		const gist = gh.getGist(gid);
		gist.read().then((res: { data: State }) => {
			this.setState({
				...res.data,
				loading: false,
			});
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<Loading>
					<i className="fas fa-spinner fa-spin fa-lg" />
					<p>加载Gist中...</p>
				</Loading>
			);
		}

		return this.gist();
	}

	gist() {
		const { files, html_url } = this.state;
		const rawHtml = Object.keys(files).map(key => {
			const { content, language, filename } = (files as any)[key];

			const html = Prism.highlight(
				content,
				Prism.languages[language.toLowerCase()],
				language
			);

			return {
				lang: language.toLowerCase(),
				html,
				key: filename,
				url: html_url,
			};
		});

		return (
			<Container>
				{rawHtml.map(({ lang, html, key, url }) => (
					<div key={key} className="gatsby-highlight">
						<pre className={`language-${lang}`}>
							<code
								className={`language-${lang}`}
								dangerouslySetInnerHTML={{ __html: html }}
							/>
						</pre>
						<a href={url} target="_black" className="title">
							{key} from Github
						</a>
					</div>
				))}
			</Container>
		);
	}
}
