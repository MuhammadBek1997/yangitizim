import { useEffect, useRef } from 'react'
import anime from 'animejs'

/**
 * Scroll-triggered animation hook — StrictMode safe.
 * initFn: DOM elementlarni yashiradi (mount paytida)
 * animFn: scroll trigger bo'lganda animatsiyani ishlatadi
 */
export function useScrollReveal(initFn, animFn, opts = {}) {
  const ref = useRef(null)
  const triggered = useRef(false)
  const { threshold = 0.12, rootMargin = '0px 0px -60px 0px' } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Agar allaqachon animatsiya bo'lgan bo'lsa qaytaramiz
    if (triggered.current) return

    initFn(el)

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          animFn(el)
          obs.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/** Raqamlarni 0 dan target gacha hisoblash animatsiyasi */
export function countUp(el, target, suffix = '', duration = 1400) {
  const obj = { value: 0 }
  anime({
    targets: obj,
    value: target,
    duration,
    easing: 'easeOutExpo',
    round: 1,
    update() {
      if (el && el.isConnected) {
        el.textContent = obj.value + suffix
      }
    },
    complete() {
      if (el && el.isConnected) {
        el.textContent = target + suffix
      }
    },
  })
}

export { anime }
