'use client';

import { HairstyleSelector } from '@/components/demo/HairstyleSelector';
import { ImagePicker } from '@/components/demo/ImagePicker';
import { ImagePreview } from '@/components/demo/ImagePreview';
import { LoadingState } from '@/components/demo/LoadingState';
import { ResultView } from '@/components/demo/ResultView';
import { useTextToImageContext } from '@/contexts/TextToImageContext';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useState } from 'react';
import { Button } from '../ui/button';

const hairstyles = [
  {
    imageUrl: '/images/glasses/1-real.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/glasses/2-real.jpeg',
    prompt: 'extract the glasses from IMG_2 and and put it on the face of IMG_1, of the glasses, keep the background, face, look and expression of IMG_1, dont add any makeup',
  }
];

export function DemoContent() {
  const { image, imagePreview, handleImageSelection, resetImage } = useImageUpload();
  const { isLoading, results, generateImage, resetResults } = useTextToImageContext();
  const [selectedHairstyle, setSelectedHairstyle] = useState<number>(-1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const index = selectedHairstyle - 1;
    const hairstyleData = hairstyles[index];

    if (image && hairstyleData) {
      generateImage(image, hairstyleData.imageUrl, hairstyleData.prompt);
    }
  };

  const handleReset = () => {
    resetResults();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto flex flex-col items-center gap-2.5">
        <h2 className="text-3xl font-normal text-[#0C0C0C] sm:text-4xl">
          Essayage en ligne de lunettes
        </h2>
        <p className="text-base font-normal text-[#7C7C7C] sm:text-lg">
          Essayez différentes lunettes avec simplement une photo de vous.
        </p>
      </div>

      <div className="flex flex-col rounded-lg border border-[#D0D4D4] bg-white">
        {isLoading ? (
          <LoadingState onCancel={() => handleReset()} />
        ) : (
          <>
            {results.length > 0 ? (
              <ResultView results={results} onReset={handleReset} />
            ) : (
              <>
                <div className="flex h-full flex-col items-center justify-between py-8 md:flex-row">
                  <div className="mb-8 flex w-full flex-1 flex-col gap-4 px-6 md:mb-0 md:w-auto md:px-12">
                    <p className="text-center text-xs font-medium text-[#0C0C0C] uppercase">
                      Ajoutez un selfie
                    </p>
                    {imagePreview ? (
                      <ImagePreview imageUrl={imagePreview} onClear={resetImage} />
                    ) : (
                      <ImagePicker onImageSelected={handleImageSelection} />
                    )}
                  </div>
                  <div className="flex w-full flex-1 flex-col gap-4 border-[#E4E5E6] px-6 md:w-auto md:border-l md:px-12">
                    <p className="text-center text-xs font-medium text-[#0C0C0C] uppercase">
                      Sélectionnez une monture
                    </p>
                    <HairstyleSelector onSelect={setSelectedHairstyle} />
                  </div>
                </div>

                <div className="flex justify-end border-t border-[#E4E5E6] px-4 py-4 sm:px-8">
                  <Button
                    onClick={handleSubmit}
                    disabled={!image || selectedHairstyle === -1}
                    className="w-full sm:w-auto"
                  >
                    Générer
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
