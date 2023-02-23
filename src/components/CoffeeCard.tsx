import Image from "next/image";
import Link from "next/link";

function CoffeStoreCard({
    title,
    address,
    imgURL,
    imgAlt,
    href,
}: {
    title: string;
    address: string;
    imgURL: string;
    imgAlt: string;
    href: string;
}) {
    return (
        <article className="rounded-lg overflow-hidden shadow-lg stack | debug">
            <Link href={href} className="no-underline">
                <div className="stack [--stack-gap:theme(spacing.xl)] grow-[5] justify-between mbs-s mbe-xs pli-xs">
                    <div className="stack [--stack-gap:theme(spacing.2xs)]">
                        <header className="stack [--stack-gap:theme(spacing.2xs)]">
                            <p className="text-1 font-bold">{title}</p>
                        </header>
                        <Image
                            src={imgURL}
                            alt={imgAlt}
                            width={400}
                            height={200}
                        />
                    </div>
                    <div>
                        <p className="text-00 text-[color:var(--neutral-on-surface-1)] opacity-80">
                            <span>{address}</span>
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export { CoffeStoreCard };
