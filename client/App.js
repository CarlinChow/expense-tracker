import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthManager from './src/Routing/AuthManager'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthManager />
    </QueryClientProvider>
  );
}

