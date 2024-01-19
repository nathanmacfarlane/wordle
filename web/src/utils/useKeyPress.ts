export type UseKeyPressProps = {
  onPress: (key: string) => void
  targetKey?: string
}

export const useKeyPress = (props: UseKeyPressProps) => {
  const keyPressHandler = (e: KeyboardEvent) => {
    if (!props.targetKey || e.key === props.targetKey) {
      props.onPress(e.key)
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', keyPressHandler)

    return () => {
      window.removeEventListener('keydown', keyPressHandler)
    }
  }, [])
}
