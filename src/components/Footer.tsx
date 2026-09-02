import { Link } from 'react-router'

import { navigazione, studio } from '@/data/contenuti'

export function Footer() {
  return (
    <footer className="border-t border-sabbia-200 py-14">
      <div className="contenitore flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/"
            className="legame font-display text-lg text-inchiostro-900 transition-colors hover:text-salvia-700"
          >
            {studio.nome}
          </Link>
          <p className="mt-2 text-sm text-inchiostro-500">{studio.ruolo}</p>
          <p className="mt-1 text-sm text-inchiostro-500">{studio.albo}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {navigazione.map((voce) => (
            <li key={voce.href}>
              <Link
                to={voce.href}
                className="legame text-sm text-inchiostro-500 transition-colors hover:text-salvia-700"
              >
                {voce.etichetta}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="contenitore mt-12 flex flex-col gap-2 border-t border-sabbia-200 pt-6 text-sm text-inchiostro-500/80 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {studio.nome} — {studio.partitaIva}
        </p>
        <p>
          <Link to="/privacy" className="legame transition-colors hover:text-salvia-700">
            Privacy e cookie policy
          </Link>
        </p>
      </div>
    </footer>
  )
}
