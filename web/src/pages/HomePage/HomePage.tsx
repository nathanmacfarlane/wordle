import { Metadata } from '@redwoodjs/web'

import Wordle from 'src/components/Wordle/Wordle'
import WordleProvider from 'src/components/WordleProvider/WordleProvider'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <WordleProvider>
        <Wordle />
      </WordleProvider>
    </>
  )
}

export default HomePage
