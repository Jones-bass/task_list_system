
import { BeatLoader } from 'react-spinners'
import { LoadingContainer } from './styles'

export function Loading() {
  return (
    <LoadingContainer>
      <BeatLoader color="#dfd0a9" size={6} />
    </LoadingContainer>
  )
}
