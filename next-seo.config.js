const title = 'Theodorus Clarence | theodorusclarence.com';
const description = 'An online portfolio and blog by Theodorus Clarence';

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
                url: 'https://theodorusclarence.com/favicon/large-og.jpg',
                alt: title,
                width: 1200,
                height: 628,
            },
        ],
    },
};

export default SEO;
