import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Forms } from "~/components/forms";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Coffe Finder</title>
                <meta
                    name="description"
                    content="Find your new favourite coffee shop"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main>
                <article className="center stack mlb-l">
                    <h2>Coffee Finder</h2>
                    <Forms />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, expedita quae totam deserunt sed optio quos dolore natus praesentium hic iusto? Voluptas beatae natus nesciunt accusantium cum libero ad eum porro similique architecto maiores eligendi voluptates, neque rerum repudiandae aliquid ducimus aperiam, qui ipsa dolor commodi recusandae, voluptatum necessitatibus. Ipsum nobis nisi deserunt voluptatum fuga sapiente, dolorum ducimus ab labore iste nemo, quam, dolore perferendis saepe. Labore pariatur esse voluptas? Omnis officia molestias a commodi explicabo accusantium veritatis voluptate placeat, fugit autem repellat aspernatur iste quidem molestiae, ad praesentium perspiciatis, necessitatibus aliquam non eum cupiditate deserunt. Voluptas hic facilis perferendis blanditiis deserunt earum incidunt? Sit aspernatur quam aliquam ea deleniti ad fuga, sunt corrupti labore maiores esse quis assumenda recusandae consectetur, voluptate natus, provident libero neque ipsum iste perferendis! In, maxime sed, labore cum sint enim modi eos, dignissimos vel nisi fugiat! Libero iusto enim est, possimus inventore id temporibus.</p>
                </article>
            </main>
        </>
    );
}
