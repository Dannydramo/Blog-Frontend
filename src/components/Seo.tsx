import { Helmet } from 'react-helmet-async';

const Seo = ({
    title,
    description,
    name,
    type,
    image,
    url,
    siteName,
}: {
    title: string;
    description: string;
    name: string;
    type: string;
    image: string;
    url?: string;
    siteName?: string;
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {url && <meta property="og:url" content={url} />}
            {siteName && <meta property="og:site_name" content={siteName} />}

            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default Seo;
