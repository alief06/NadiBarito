import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    description, 
    image = '/og-image.png', 
    url = 'https://nadibarito.com', 
    type = 'website',
    category = 'Culture'
}) => {
    const siteTitle = 'NADIBARITO';
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | The Digital Pulse of Thousand Rivers`;
    const fullDescription = description || "Jelajahi keajaiban budaya, alam, dan modernitas Kalimantan Selatan dalam satu platform interaktif yang imersif.";

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={fullDescription} />
            <meta name='keywords' content={`Nadi Barito, Banjarmasin, Kalimantan Selatan, ${category}, Wisata, Budaya`} />
            <meta name='author' content='NADIBARITO Team' />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={fullDescription} />
            <meta property="twitter:image" content={image} />

            {/* Theme & PWA */}
            <meta name="theme-color" content="#050505" />
        </Helmet>
    );
};

export default SEO;
