import Link from "next/link";
import { useRouter } from "next/router";

export default function CoffeeStore() {
    let router = useRouter();
    let querySegment = router.query.id;
    console.log({ querySegment });
    return (
        <>
            <main>
                <Link href="/">Back to Home</Link>
                <article className="center stack mlb-l">
                    <h2>Coffee Layout</h2>
                </article>
            </main>
        </>
    );
}

