import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import apiService from '../services/ApiService';
import ReactMarkdown from 'react-markdown';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const cancelStreamRef = useRef<() => void | null>(null);

    useEffect(() => {
        return () => {
            if (cancelStreamRef.current) {
                cancelStreamRef.current();
            }
        };
    }, []);

    const handleSubmit = () => {
        if (!query.trim()) return;

        setIsLoading(true);
        setResponse('');

        if (cancelStreamRef.current) {
            cancelStreamRef.current();
        }

        cancelStreamRef.current = apiService.streamChat(
            { query: query.trim() },
            (token) => {
                setResponse((prev) => prev + token);
            },
            (error) => {
                console.error('Erreur:', error);
                setResponse((prev) => prev + '\n\nUne erreur est survenue.');
                setIsLoading(false);
            },
            () => {
                setIsLoading(false);
                cancelStreamRef.current = null;
            }
        );
    };

    return (
        <div className="flex flex-col  gap-8">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-4 md:mb-6 xl:mb-8 text-center">
                    Une question sur la montagne ?
                </h1>
                <div className="rounded-lg shadow-md p-6 mb-4 md:mb-6 border-1">
                    <textarea
                        className="w-full resize-none focus:outline-none scrollbar-hide"
                        placeholder="Posez votre question ici..."
                        rows={2}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <Button
                    className="px-4 self-center"
                    onClick={handleSubmit}
                    disabled={isLoading || !query.trim()}
                >
                    {isLoading ? 'Chargement...' : 'Envoyer'}
                </Button>
            </div>
            {response && (
                <div
                    className="md:p-6 xl:p-8 md:max-h-[calc(100vh-350px)] md:min-h-[200px] 
                                overflow-y-auto scrollbar-thin flex-grow
                                prose prose-sm md:prose-base max-w-none"
                >
                    <ReactMarkdown>{response}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default HomePage;
