export interface IPost {
    id: number,
    image_url: string,
    post_title: string,
    post_gist: string,
    post_description: string,
    user: number;
    time_created: Date,
    last_edit: Date,
    tech_stack: number[],
    likes: number,
    status: string,
    collaboraters: string[], //Subject to changes
    file: string 
}