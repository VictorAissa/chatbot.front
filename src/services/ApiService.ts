export interface ChatRequest {
    query: string;
    use_rag?: boolean;
    top_k?: number;
    temperature?: number;
}

export interface ChatStreamResponse {
    type: 'start' | 'token' | 'end' | 'error';
    token?: string;
    error?: string;
}

export interface HealthResponse {
    status: string;
    version: string;
    collection_stats: CollectionStats;
}

export interface CollectionStats {
    collection_name: string;
    document_count: string;
    persist_directory: string;
}

class ApiService {
    private baseUrl: string;

    constructor() {  
        this.baseUrl = import.meta.env.VITE_API_URL;
    }

    streamChat(
        request: ChatRequest,
        onToken: (token: string) => void,
        onError: (error: string) => void,
        onComplete: () => void
    ): () => void {
        const url = new URL(`${this.baseUrl}/api/chat/stream`);
        if (request.query) url.searchParams.append('query', request.query);
        if (request.use_rag !== undefined)
            url.searchParams.append('use_rag', request.use_rag.toString());
        if (request.top_k !== undefined)
            url.searchParams.append('top_k', request.top_k.toString());
        if (request.temperature !== undefined)
            url.searchParams.append(
                'temperature',
                request.temperature.toString()
            );

        const eventSource = new EventSource(url.toString());

        eventSource.onmessage = (event) => {
            if (event.data === '[DONE]') {
                eventSource.close();
                onComplete();
                return;
            }

            try {
                const data = JSON.parse(event.data) as ChatStreamResponse;

                switch (data.type) {
                    case 'token':
                        if (data.token) {
                            onToken(data.token);
                        }
                        break;
                    case 'error':
                        if (data.error) {
                            onError(data.error);
                        }
                        eventSource.close();
                        break;
                    case 'end':
                        break;
                }
            } catch (error) {
                console.error('Erreur lors du parsing de la réponse:', error);
                onError('Erreur lors du traitement de la réponse');
                eventSource.close();
            }
        };

        eventSource.onerror = (error) => {
            console.error('Erreur SSE:', error);
            onError('La connexion avec le serveur a été interrompue');
            eventSource.close();
            onComplete();
        };

        return () => {
            eventSource.close();
        };
    }
      
    async getHealth(): Promise<HealthResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/api/`);
            if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }
}

export default new ApiService();
