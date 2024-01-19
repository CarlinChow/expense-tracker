import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query'
import AuthManager from './src/Routing/AuthManager'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastManager, { Toast } from 'toastify-react-native'

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => Toast.error(`Something went wrong: ${error.message}`, 'top'),
        defaultOptions: { queries: { staleTime: Infinity } }
    })
})

export default function App() {
  return (
    <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
            <ToastManager />
            <AuthManager />
        </QueryClientProvider>
    </SafeAreaProvider>
  );
}

