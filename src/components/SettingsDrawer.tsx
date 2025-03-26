/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatRequest } from '../services/ApiService';
import { Button } from './ui/button';
import {
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    Drawer,
} from './ui/drawer';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

interface SettingsDrawerProps {
    disabled: boolean;
    chatRequest: ChatRequest;
    onChange: (field: string, value: any) => void;
}

const SettingsDrawer = ({
    disabled,
    chatRequest,
    onChange,
}: SettingsDrawerProps) => {
    const handleRagChange = (checked: boolean) => {
        onChange('use_rag', checked);
    };

    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange('top_k', parseInt(e.target.value, 10));
    };

    const handleTemperatureChange = (values: number[]) => {
        onChange('temperature', values[0]);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="secondary"
                    className="cursor-pointer"
                    disabled={disabled}
                >
                    Settings
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-8 md:p-12">
                <DrawerHeader>
                    <DrawerTitle className="flex justify-center text-xl">
                        Settings
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-4">
                        <Label>Utiliser le RAG</Label>
                        <Checkbox
                            id="useRag"
                            checked={chatRequest.use_rag}
                            onCheckedChange={handleRagChange}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="tokenMax">Nombre max de tokens</Label>
                        <Input
                            type="number"
                            id="tokenMax"
                            placeholder="3"
                            value={chatRequest.top_k}
                            className="w-auto max-w-32"
                            onChange={handleTokenChange}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="temperature">Temperature</Label>
                        <span className="text-sm font-medium">
                            {chatRequest.temperature?.toFixed(1) ?? '?'}
                        </span>
                        <Slider
                            id="temperature"
                            defaultValue={[0.7]}
                            min={0.1}
                            max={4}
                            step={0.1}
                            onValueChange={handleTemperatureChange}
                            className="w-full max-w-64"
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default SettingsDrawer;
