declare namespace Post {
  export interface Frontmatter {
    date: string
    description: string
    tags: string[]
    title: string
    layout: string
  }
  export interface WordCount {
    paragraphs: number
    sentences: number
    words: number
  }
  export interface CommonInfo {
    frontmatter: Frontmatter
    fileAbsolutePath: string
    id: string
    timeToRead: number
    wordCount: WordCount
  }

	// post detail
	export interface Detail {
    markdownRemark: CommonInfo & {
      html: string
      htmlAst: any
    }
  }

  // post list
  export interface Lists {
    allMarkdownRemark: {
      edges: {
        node: CommonInfo
      }[]
      totalCount: number
    }
  }
}