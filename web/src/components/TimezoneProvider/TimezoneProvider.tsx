import { useEffect } from 'react'

import { useUpdateUserTz } from 'src/requests/useUpdateUserTz'

export type TimezoneProviderProps = {
  children: React.ReactNode
}

export const TimezoneProvider: React.FC<TimezoneProviderProps> = ({
  children,
}) => {
  const [updateUserTz] = useUpdateUserTz()

  useEffect(() => {
    updateUserTz({
      variables: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    })
  }, [])

  return children
}
