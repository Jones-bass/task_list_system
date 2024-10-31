
import { BeatLoader } from 'react-spinners'
import { LoadingContainer } from './styles'

export function Loading() {
  return (
    <LoadingContainer>
      <BeatLoader color="#f0f0f0" size={8} />
    </LoadingContainer>
  )
}
