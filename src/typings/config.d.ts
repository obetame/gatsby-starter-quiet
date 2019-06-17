declare namespace Config {
  export interface CreatePage {
    posts: {
      list: string
      listPath: string
      detail: string
      detailPath: string
      tag: string
      tagPath: string
    }
    sample: {
      list?: string
      listPath?: string
      detail?: string
      detailPath?: string
      tag?: string
      tagPath?: string
    }
    activeLayout: 'posts'
  }

  export interface DataYaml {
    dataYaml: {
      createPageConfig: CreatePage
    }
  }
}