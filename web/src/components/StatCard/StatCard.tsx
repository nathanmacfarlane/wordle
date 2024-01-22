import {
  Box,
  Card,
  CardBody,
  HStack,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { LucideIcon } from 'lucide-react'

export type StatCardProps = {
  label: string
  value?: string
  icon: LucideIcon
  isLoading?: boolean
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  isLoading,
}) => {
  const Icon = icon
  return (
    <Card w="full" variant="filled">
      <CardBody>
        <HStack alignItems="flex-start">
          <Box p="4" bg="green.400" rounded="full">
            <Icon size={24} color="white" />
          </Box>
          <Stat>
            <StatLabel>{label}</StatLabel>
            <StatNumber>
              {isLoading ? <Spinner /> : value ? value : '-'}
            </StatNumber>
          </Stat>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default StatCard
