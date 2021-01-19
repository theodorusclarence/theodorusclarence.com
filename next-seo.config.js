const title = 'theodorusclarence.com';
const description = 'Front-end developer, JavaScript enthusiast, and course creator.';

const SEO = {
    title,
    description,
    canonical: 'https://theodorusclarence.com',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://theodorusclarence.com',
        title,
        description,
        images: [
            {
                url: 'https://theodorusclarence.com/favicon/mc-icon-144x144.png',
                alt: title,
                width: 144,
                height: 144,
            },
        ],
    },
};

export default SEO;
