import { Metadata } from '@redwoodjs/web'

import Wordle from 'src/components/Wordle/Wordle'
import WordleProvider from 'src/components/WordleProvider/WordleProvider'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <WordleProvider>
        {/* TODO - make this modal less annoying */}
        {/* <GameOverModal />  */}
        <Wordle />
      </WordleProvider>
    </>
  )
}

export default HomePage
