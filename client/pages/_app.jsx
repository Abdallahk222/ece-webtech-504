import Link from 'next/link'
import '../styles/globals.css'
import { UserProvider } from '../components/UserContext'; // Make sure to import UserProvider

export default function App({ Component, pageProps }) {
    return (
      <UserProvider>
        <header>
          <h1 className="font-bold text-red-600">Lab 4</h1>
          <br></br>
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
            <li>
              <Link href="/use-state">Use state</Link>
            </li>
            <li>
              <Link href="/login-native">Login</Link>
            </li>
          </ul>
        </nav>
        <Component {...pageProps} />
      </UserProvider>
    );
}