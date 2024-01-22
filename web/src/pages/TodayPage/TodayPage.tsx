import { Metadata } from '@redwoodjs/web'

import Wordle from 'src/components/Wordle/Wordle'
import WordleProvider from 'src/components/WordleProvider/WordleProvider'

const TodayPage = () => {
  return (
    <>
      <Metadata title="Today" description="Today page" />

      <WordleProvider>
        <Wordle />
      </WordleProvider>
    </>
  )
}

export default TodayPage
