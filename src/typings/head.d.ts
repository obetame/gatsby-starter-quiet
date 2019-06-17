declare namespace Head {
	interface Meta {
		property?: string
		name?: string
		content?: string
	}

	export interface Seo {
		description?: string
		lang?: string
		meta?: Meta[]
		title: string
	}

	export interface Layout {
		children: JSX.Element | JSX.Element[]
		title: string
		meta?: Meta[]
    description?: string
    className?: string | undefined
  }
  
  export interface Icons {
    dataYaml: {
      name: string
      social: {
        [key: string]: {
          url: string
          icon: string
        }
      }
    }
  }
}