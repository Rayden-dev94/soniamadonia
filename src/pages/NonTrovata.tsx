import { Link } from 'react-router'

export default function NonTrovata() {
  return (
    <section className="pt-40 pb-32 sm:pt-48">
      <div className="contenitore max-w-xl text-center">
        <p className="font-display text-sm tracking-[0.2em] text-salvia-600 uppercase">
          Errore 404
        </p>
        <h1 className="mt-5 text-3xl leading-tight sm:text-4xl">
          Questa pagina non esiste.
        </h1>
        <p className="mt-6 leading-relaxed text-inchiostro-500">
          Forse il link è cambiato, o c’è un refuso nell’indirizzo. Puoi tornare
          alla home e ripartire da lì.
        </p>
        <Link
          to="/"
          className="bottone-verde mt-10 inline-block px-7 py-3.5"
        >
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
