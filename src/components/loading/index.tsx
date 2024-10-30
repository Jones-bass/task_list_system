
import { PuffLoader } from 'react-spinners'
import { LoadingContainer } from './styles'

export function Loading() {
  return (
    <LoadingContainer>
      <PuffLoader color="#dfd0a9" size={18} />
    </LoadingContainer>
  )
}
