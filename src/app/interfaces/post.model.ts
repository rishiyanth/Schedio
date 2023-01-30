export interface IPost {
    id: number,
    image_urls: string[],
    post_title: string,
    post_gist: string,
    post_description: string,
    user_id: number;
    likes: number,
}