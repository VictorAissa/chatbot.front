import {
    createContext,
    useState,
    ReactNode,
    useEffect,
    useContext,
    useRef,
    ReactElement,
} from 'react';
import ApiService, { HealthResponse } from '../services/ApiService';
import { toast } from 'sonner';

interface HealthContextType {
    isHealthLoading: boolean;
    healthData: HealthResponse | null;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider = ({ children }: { children: ReactNode }) => {
    const [isHealthLoading, setIsHealthLoading] = useState<boolean>(false);
    const [healthData, setHealthData] = useState<HealthResponse | null>(null);
    const checkPerformedRef = useRef<boolean>(false);

    useEffect(() => {
        if (checkPerformedRef.current) return;

        checkPerformedRef.current = true;
        setIsHealthLoading(true);

        toast.promise(ApiService.getHealth(), {
            loading: 'Démarrage du système...',
            success: (data) => {
                setHealthData(data);
                setIsHealthLoading(false);

                return <HealthStatusMessage data={data} />;
            },
            error: (err) => {
                console.error('Health check failed:', err);
                setIsHealthLoading(false);

                return 'Erreur de connexion au backend';
            },
        });
    }, []);

    return (
        <HealthContext.Provider value={{ isHealthLoading, healthData }}>
            {children}
        </HealthContext.Provider>
    );
};

const HealthStatusMessage = ({
    data,
}: {
    data: HealthResponse | null;
}): ReactElement => {
    if (!data) {
        return <div>Réponse de l'API sans données d'état</div>;
    }

    return (
        <div className="space-y-2">
            <div className="text-lg">Système connecté</div>
            <div>
                <div>
                    <span className="font-bold">Statut: </span> {data.status}
                </div>
                <div>
                    <span className="font-bold">Version: </span> {data.version}
                </div>
                <div>
                    <span className="font-bold">Collection ChromaDB: </span>
                    {data.collection_stats?.collection_name ?? 'inconnue'}
                </div>
                <div>
                    <span className="font-bold">Documents utilisables:</span>
                    {data.collection_stats?.document_count ?? '0'}
                </div>
            </div>
        </div>
    );
};

export const useHealth = () => {
    const context = useContext(HealthContext);
    if (context === undefined) {
        throw new Error('useHealth must be used within a HealthProvider');
    }
    return context;
};

export default HealthContext;
