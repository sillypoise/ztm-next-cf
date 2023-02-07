import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Forms } from "~/components/forms";
import { Code } from "~/components/code";
import { Table } from "~/components/tables";
import { Overview } from "~/components/overview";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const dialogRef = useRef(null)
    return (
        <>
            <Head>
                <title>Coffee Finder</title>
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
                    <div className="box bg-[var(--overlay-black-10)]">HELLO</div>
                    <div>
                        {" "}
                        <button type="button" id="dialog-trigger" 
                            onClick={() => console.log(dialogRef.current.showModal())}
                        >
                            {" "}
                            Show me the dialog!{" "}
                        </button>{" "}
                        <span id="dialog-result"></span>{" "}
                    </div>
                    <dialog ref={dialogRef} id="dialog">
                        {" "}
                        <header>This is a sample dialog</header>{" "}
                        <form method="dialog">
                            {" "}
                            <p>What is your favorite pet animal?</p>{" "}
                            <menu>
                                {" "}
                                <button value="feline">Cats</button>{" "}
                                <button value="canine">Dogs</button>{" "}
                                <button value="other">Others</button>{" "}
                            </menu>{" "}
                        </form>
                    </dialog>
                    <Overview />
                    {/* <Code/> */}
                    {/* <Table /> */}
                    {/* <Forms /> */}
                </article>
            </main>
        </>
    );
}
