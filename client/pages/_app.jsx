import Link from 'next/link'

export default function App({ Component, pageProps }) {
    return (<>
    <header>
      <h1>Lab 4</h1>
    </header>
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/contacts">Contact Us</Link>
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
      </ul>
    </nav>
    <Component {...pageProps} />
    <p></p>
    <footer>
      <small>Copyright © 2023 Moi-même. Tous droit réservés.</small>
    </footer>
    </>
    )
  }