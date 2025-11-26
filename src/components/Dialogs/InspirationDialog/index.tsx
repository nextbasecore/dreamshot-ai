'use client';

import { DialogBase } from '@/components/DialogBase';
import { DashboardInspiration } from '@/types';
import PromptInput from '@/components/InputFields/PromptInput';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useHandleDialogType } from '@/hooks/useHandleDialogType';

interface InspirationDialogProps {
    inspiration: DashboardInspiration | null;
}

/**
 * Inspiration dialog displaying image with editable prompt and read-only metadata
 */
export default function InspirationDialog({ inspiration }: InspirationDialogProps) {
    const { handleDialogType } = useHandleDialogType();

    // Derive prompt from inspiration prop instead of storing in state
    const promptValue = inspiration?.prompt || '';

    return (
        <DialogBase
            name="inspirationDialog"
            title="Inspiration Details"
            className="!max-w-[60vw] sm:!max-w-[60vw] w-full h-[70vh]"
            hideHeader={true}
            removeCloseButton={true}
            disableClose={false}
        >
            {inspiration ? (
                <div className="flex flex-col md:flex-row gap-6 w-full h-full">

                    {/* Left: Image (60% width on desktop) */}
                    <div className="w-full md:w-[60%] h-[50vh] md:h-full">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden items-center justify-center">
                            <Image
                                src={inspiration.imageUrl}
                                alt={inspiration.title || 'Inspiration image'}
                                fill
                                className="object-contain bg-gray-100"
                                sizes="(max-width: 768px) 100vw, 60vw"
                                priority
                                unoptimized={inspiration.imageUrl.startsWith('/')}
                            />
                        </div>
                    </div>

                    {/* Right: Form fields (40% width on desktop) */}
                    <div className="w-full md:w-[40%] flex flex-col gap-4 md:gap-6 overflow-y-auto">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-foreground">
                            {inspiration.title}
                        </h2>

                        {/* Prompt Input */}
                        <div className="flex flex-col">
                            <PromptInput
                                label="Prompt"
                                value={promptValue}
                                onChange={() => { }} // Read-only display
                                placeholder="No prompt available"
                                disabled={!promptValue}
                            />
                        </div>

                        {/* PhotoPack */}
                        {inspiration.photoPack && (
                            <div className="flex flex-col">
                                <h3 className="text-sm font-medium text-foreground mb-2">
                                    Photo Pack
                                </h3>
                                <div className="w-full bg-black/5 rounded-md px-3 py-3 text-black text-sm">
                                    {inspiration.photoPack}
                                </div>
                            </div>
                        )}

                        {/* Model */}
                        {inspiration.Model && (
                            <div className="flex flex-col">
                                <h3 className="text-sm font-medium text-foreground mb-2">
                                    Model
                                </h3>
                                <div className="w-full bg-black/5 rounded-md px-3 py-3 text-black text-sm">
                                    {inspiration.Model}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </DialogBase>
    );
}

