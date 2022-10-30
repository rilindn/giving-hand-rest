interface Images {
  url: string
}

export interface IProduct {
  _id: string
  title: string
  description: string
  images: Images[]
  userId: string
}

export interface IProductPayload {
  title: string
  description: string
  images: Images[]
  userId: string
}
