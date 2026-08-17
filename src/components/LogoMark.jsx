/**
 * LogoMark — GIF animatsiyasidan foydalanadi
 */
export default function LogoMark({ size = 40 }) {
  return (
    <img
      src="/animations/logo_appear_effect.gif"
      height={size}
      style={{ display: 'block', flexShrink: 0 }}
      alt="Yangi Tizim"
      draggable={false}
    />
  )
}
