import { Metadata } from '@redwoodjs/web'

import HallOfFameCell from 'src/components/HallOfFameCell'

const HallOfFamePage = () => {
  return (
    <>
      <Metadata title="HallOfFame" description="HallOfFame page" />

      <HallOfFameCell />
    </>
  )
}

export default HallOfFamePage
