'use client';

import { useTextToImageContext } from '@/contexts/TextToImageContext';
import { Status } from '@/hooks/useTextToImage';
import { Button } from '../ui/button';

type LoadingStateProps = {
  onCancel: () => void;
};

const copy = {
  [Status.IDLE]: 'Loading...',
  [Status.PENDING]: 'Ajout de votre image à la file d\'attente...',
  [Status.RUNNING]: 'Traitement de votre image...',
  [Status.SUCCEEDED]: 'Image générée!',
  [Status.FAILED]: 'Erreur lors de la génération de l\'image',
};

export function LoadingState({ onCancel }: LoadingStateProps) {
  const { status, cancelTask } = useTextToImageContext();

  const handleCancel = async () => {
    await cancelTask();
    onCancel();
  };

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center">
      <Spinner />
      <p className="mt-4 text-lg">{copy[status]}</p>

      <Button onClick={handleCancel} variant="outline" className="mt-4">
        Cancel
      </Button>
    </div>
  );
}

const Spinner = () => (
  <div className="border-primary h-16 w-16 animate-spin rounded-full border-b-2" />
);
