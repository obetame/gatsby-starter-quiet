import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

interface Image {
	allFile: {
		edges: {
			node: {
				childImageSharp: {
					fluid: {
						aspectRatio: number;
						base64: string;
						sizes: string;
						src: string;
						srcSet: string;
					};
				};
				relativePath: string;
			};
		}[];
	};
}
interface Props {
	name: string;
}

function getImage(image: Image, name: string) {
	const { edges } = image.allFile;

	for (let {
		node: { childImageSharp, relativePath },
	} of edges) {
		if (childImageSharp && relativePath === name) return childImageSharp.fluid;
	}
}

export default (props: Props) => {
	const { name } = props;

	return (
		<StaticQuery
			query={graphql`
				query {
					allFile {
						edges {
							node {
								childImageSharp {
									fluid {
										aspectRatio
										base64
										sizes
										src
										srcSet
									}
								}
								relativePath
							}
						}
					}
				}
			`}
			render={(data: Image) => <Img fluid={getImage(data, name)} />}
		/>
	);
};
