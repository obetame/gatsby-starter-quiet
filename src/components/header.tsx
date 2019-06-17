import { StaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Logo = styled(Link)`
	font-family: 'Cormorant Garamond', Courier, serif;
	display: inline-block;
	font-size: 36px;
	font-weight: 700;
	text-decoration: none;
	color: var(--color);
`;
const IconList = styled.ul`
	float: right;
	padding: 0;
	margin: 15px 0 0;
	list-style: none;
	li {
		display: inline-block;
		margin-left: 2rem;
	}
`;

const Icon = ({ data }: { data: Head.Icons }) => {
	const { social } = data.dataYaml;

	return (
		<IconList>
			{Object.keys(social).map((key, i) => (
				<li key={key}>
					<a href={social[key].url} title={key}>
						<i className={social[key].icon} />
					</a>
				</li>
			))}
		</IconList>
	);
};

const Header = () => (
	<StaticQuery
		query={graphql`
			query {
				dataYaml {
					name
					social {
						tags {
							icon
							url
						}
						about {
							icon
							url
						}
						github {
							icon
							url
						}
						email {
							icon
							url
						}
						rss {
							icon
							url
						}
					}
				}
			}
		`}
		render={data => (
			<header>
				<Logo to="/" title="QuietBoy">
					{data.dataYaml.name}
				</Logo>
				<Icon data={data} />
			</header>
		)}
	/>
);

export default Header;
