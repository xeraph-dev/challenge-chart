import './Navbar.scss'

interface NavbarProps {
  pageTitle: string
  title: string
}

export default function Navbar({ pageTitle, title }: NavbarProps) {
  return (
    <header>
      <h2>{pageTitle}</h2>
      <h2>{title}</h2>
    </header>
  )
}
