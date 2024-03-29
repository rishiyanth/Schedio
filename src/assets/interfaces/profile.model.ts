export interface IProfile{
    id?: number,
    username?: string,
    first_name?: string,
    last_name?: string,
    user_bio?: string,
    techstack?: string[],
    image_url?: string,
    email?: string,
    dob?: Date,
    user_gender?: string,
    phone_number?: string,
    country?: string,
    profession?: string,
    organisation?: string,
    followers?: string[],
    user: number
}