import { Html, Head, Main, NextScript } from "next/document";
import { NextSeo } from "next-seo";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="./logo.svg" />
        
      </Head>
      <body>
      <NextSeo
        openGraph={{
          type: "website",
          url: "https://brandhive.vercel.app/",
          title: "Brandhive",
          description: "Welcome to Brandhive,developed by Piyush Kalyan, the ultimate platform for generating new and creative brand names using the power of artificial intelligence (AI). Our website utilizes state-of-the-art algorithms and deep learning models to generate unique, catchy, and memorable brand names that will set your business apart from the competition.",
          images: [
            {
              url: "https://brandhive.vercel.app/ss.png",
              width: 800,
              height: 600,
              alt: "Brandhive",
            },
          ],
        }}
      />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
