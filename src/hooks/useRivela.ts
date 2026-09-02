import { useRef } from 'react'

import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

/**
 * Anima in entrata tutti gli elementi con `data-anim` contenuti nel nodo
 * restituito, non appena la sezione entra nel viewport.
 *
 * Lo stato iniziale (`opacity: 0`) è già in CSS, così non c'è flash di
 * contenuto prima che il JS sia pronto.
 */
export function useRivela<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const bersagli = gsap.utils.toArray<HTMLElement>('[data-anim]')
      if (bersagli.length === 0) return

      if (motoRidotto()) {
        gsap.set(bersagli, { opacity: 1, y: 0 })
        return
      }

      gsap.set(bersagli, { opacity: 0, y: 32 })
      gsap.to(bersagli, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
          once: true,
        },
      })
    },
    { scope: ref },
  )

  return ref
}
