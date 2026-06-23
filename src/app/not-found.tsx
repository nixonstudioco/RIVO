import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="container-rivo flex min-h-[80svh] flex-col items-center justify-center text-center">
      <span className="font-serif text-[clamp(6rem,22vw,16rem)] font-semibold leading-none tracking-tightest text-accent/20">
        404
      </span>
      <h1 className="mt-4 text-3xl tracking-tightest sm:text-4xl">
        Pagina nu a fost găsită
      </h1>
      <p className="mt-4 max-w-md font-sans text-base text-bone/55">
        Se pare că adresa căutată nu există sau a fost mutată. Hai înapoi la
        proiectele noastre.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <MagneticButton href="/">Înapoi acasă</MagneticButton>
        <MagneticButton href="/proiecte" variant="outline">
          Vezi proiectele
        </MagneticButton>
      </div>
      <Link href="/contact" className="sr-only">
        Contact
      </Link>
    </section>
  );
}
