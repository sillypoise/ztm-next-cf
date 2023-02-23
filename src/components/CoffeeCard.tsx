import Image from "next/image";
import Link from "next/link";

function CoffeStoreCard({
    title,
    address,
    image,
    href,
}: {
    title: string;
    address: string;
    image: {
        url: string;
        height: number;
        width: number;
        description: string;
        alt_description: string;
    };
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
                            src={image.url}
                            alt={image.alt_description}
                            height={image.height}
                            width={image.width}
                            className="object-cover aspect-[1.45] w-auto h-auto"
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
