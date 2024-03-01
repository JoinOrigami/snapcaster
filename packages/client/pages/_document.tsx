import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon.png"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta name="msapplication-TileColor" content="#256ee7" />

          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#1d2430"
          />
          <meta name="theme-color" content="#fefefe" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
