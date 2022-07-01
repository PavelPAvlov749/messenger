//                 ....................................TYPES FOR ALL POST COMPONENTS

export type ComentType = {
    coment_text: string,
    coment_likes: number,
    coment_owner_name: string,
    date: number
}

export type PostType = {
    coments: Array<ComentType>,
    likes?: number,
    post_img: string,
    post_text: string,
    id: string
}
export type SinglePostType = {
    comments?: Array<ComentType>,
    likes?: number,
    post_img: string,
    post_text: string,
    id: string,
    set_showed_post: (post_id: string) => void
}
//All posts type
export type UserPostsType = {
    posts?: Array<PostType> | null,
    get_posts: () => void,
    set_showed_post: (_post_id: string) => void,
    get_posts_2: (user_id: string | null | undefined) => void
}
export type Show_post_type = {
    user_name?: string,
    user_avatar?: string,
    post?: PostType
}
export type ShowedPostType = {
    post: PostType
}