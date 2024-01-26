import { useMemo, useState } from 'react'

import {
  Button,
  Center,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { addDays, format } from 'date-fns'
import { Medal } from 'lucide-react'
import type {
  BoardCell,
  FindBoardQuery,
  FindBoardQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAddGuess } from 'src/requests/useAddGuess'
import { padEnd } from 'src/utils/array'

import BoardRowView from '../BoardRow/BoardRow'
import DailyLeaderboard from '../DailyLeaderboard/DailyLeaderboard'
import VirtualKeyboard from '../VirtualKeyboard/VirtualKeyboard'

export const QUERY = gql`
  query FindBoardQuery($date: Date!) {
    board(date: $date) {
      date
      rows {
        cells {
          letter
          status
        }
      }
      isComplete
      keyboard {
        correctLetters
        incorrectLetters
        misplacedLetters
      }
    }
  }
`

export const Loading = () => (
  <Center w="100%" minH="100">
    <Spinner />
  </Center>
)

export const Empty = () => <Failure error={new Error('Server Error')} />

export const Failure = ({
  error,
}: CellFailureProps<FindBoardQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  board: initialBoard,
  queryResult,
}: CellSuccessProps<FindBoardQuery, FindBoardQueryVariables>) => {
  const [activeWord, setActiveWord] = useState('')
  const [board, setBoard] = useState(initialBoard)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const toast = useToast()

  const [addGuess, { loading: isSubmitting }] = useAddGuess({
    onCompleted: (data) => {
      if (data.addGuess.error) {
        toast({
          title: data.addGuess.error,
          status: 'error',
          isClosable: true,
          position: 'top',
        })
      } else {
        setActiveWord('')
        setBoard(data.addGuess.board)
        if (data.addGuess.board.isComplete) {
          if (
            data.addGuess.board.rows.some((row) =>
              row.cells.every((cell) => cell.status === 'CORRECT')
            )
          ) {
            toast({
              title: 'You did it!',
              status: 'success',
              isClosable: true,
              position: 'top',
            })
          } else {
            toast({
              title: 'Oh no. Good try!',
              status: 'warning',
              isClosable: true,
              position: 'top',
            })
          }
        }
      }
    },
  })

  const handleKeyPress = (key: string) => {
    if (board.isComplete) return

    const addLetterToGuess = (additionalLetter: string) => {
      if (activeWord.length >= 5) {
        // word is already 5 letters
        return
      }
      setActiveWord((prev) => prev + additionalLetter)
    }

    const removeLetterFromGuess = () => {
      if (activeWord.length === 0) return
      setActiveWord((prev) => prev.slice(0, -1))
    }

    const handleSubmitGuess = () => {
      if (activeWord.length !== 5) return
      addGuess({ variables: { date: board.date, word: activeWord } })
    }

    if (key === 'ENTER') {
      handleSubmitGuess()
    } else if (key === 'delete') {
      removeLetterFromGuess()
    } else {
      addLetterToGuess(key.toLowerCase())
    }
  }

  const boardRows = useMemo(() => {
    const activeRowIndex = board.rows.findIndex((row) =>
      row.cells.some((cell) => cell.status === 'EMPTY')
    )
    // replace rows at active row index
    return board.rows.map((row, index) => {
      if (index === activeRowIndex) {
        const activeRow: BoardCell[] = padEnd(activeWord.split(''), 5, '').map(
          (letter) => ({
            letter,
            status: 'EMPTY',
          })
        )
        return { cells: activeRow }
      }
      return row
    })
  }, [activeWord, board.rows])

  return (
    <>
      <DailyLeaderboard
        date={queryResult?.variables?.date || ''}
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
      <VStack w="auto" h="100%" justifyContent="space-between" py="4">
        <Text>{format(addDays(board.date, 1), 'MMM d')}</Text>
        <Button
          variant="outline"
          aria-label="Daily Leaderboard"
          rightIcon={<Medal size={22} />}
          onClick={() => setIsLeaderboardOpen(true)}
        >
          Leaderboard
        </Button>
        <VStack spacing={1}>
          {boardRows.map((row, index) => (
            <BoardRowView key={index} boardRow={row} />
          ))}
        </VStack>
        <VirtualKeyboard
          onPress={handleKeyPress}
          isSubmitting={isSubmitting}
          keyStatuses={board.keyboard}
        />
      </VStack>
    </>
  )
}
