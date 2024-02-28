export interface AuthorProps {
    _id: string;
    username: string;
    email: string;
    description: string;
    created_at: string;
    photo: string;
    updated_at: string | null;
    __v: number;
}
export interface BlogContent {
    summary: string;
    title: string;
    content: string;
    coverImage: string;
    category: string;
}
export interface BlogProps {
    _id: string;
    title: string;
    coverImage: string;
    content: string;
    summary: string;
    slug: string;
    category: string;
    author: AuthorProps;
    reviews: string[];
    created_at: string;
    updated_at: string;
    __v: number;
}
