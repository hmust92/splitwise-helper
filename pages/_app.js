import '../styles/globals.css'
import Modal from 'react-modal';

Modal.setAppElement("#__next")


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
