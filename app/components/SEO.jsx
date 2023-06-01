import Head from "next/head"

const SEO = ({
    pageDescription,
    pageTitle,
    pageImage,
    pageUrl,
    pageKeywords,
  }) => {
  return (
    <Head>
      <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />

        {/* FB Meta Tags */}

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="PV Coastal Realty"
        />

        {/* Twitter Meta Tags */}

        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="robots" content="index, follow" />

    </Head>
  )
}

export default SEO