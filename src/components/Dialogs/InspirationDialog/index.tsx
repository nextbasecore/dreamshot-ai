'use client';

import { DialogBase } from '@/components/DialogBase';
import { DashboardInspiration } from '@/types';
import PromptInput from '@/components/InputFields/PromptInput';
import Image from 'next/image';

interface InspirationDialogProps {
    inspiration: DashboardInspiration | null;
}

/**
 * Inspiration dialog displaying image with editable prompt and read-only metadata
 */
export default function InspirationDialog({ inspiration }: InspirationDialogProps) {
    // Derive prompt from inspiration prop instead of storing in state
    const promptValue = inspiration?.prompt || '';

    return (
        <DialogBase
            name="inspirationDialog"
            title="Inspiration Details"
            className="max-w-[90vw]! sm:max-w-[80vw]! md:max-w-[75vw]! lg:max-w-[65vw]! xl:max-w-[60vw]! w-full h-auto max-h-[85vh] sm:max-h-[80vh] md:max-h-[75vh] lg:max-h-[70vh]"
            hideHeader={true}
            removeCloseButton={true}
            disableClose={false}
        >
            {inspiration ? (
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-4 lg:gap-5 w-full p-3 sm:p-4 md:p-4 lg:p-3">
                    {/* Left: Image (50% width on desktop, full width on mobile) */}
                    <div className="w-full lg:w-[50%] h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[45vh] xl:h-[50vh] shrink-0 flex items-center justify-center">
                        <div className="relative w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                            <Image
                                src={inspiration.imageUrl}
                                alt={inspiration.title || 'Inspiration image'}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 50vw"
                                priority
                                unoptimized={inspiration.imageUrl.startsWith('/')}
                            />
                        </div>
                    </div>

                    {/* Right: Form fields (50% width on desktop, full width on mobile) */}
                    <div className="w-full lg:w-[50%] flex flex-col gap-3 sm:gap-4 md:gap-4 lg:gap-3 shrink">
                        {/* Title */}
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground wrap-break-word">
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
                                <h3 className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                                    Photo Pack
                                </h3>
                                <div className="w-full bg-black/5 rounded-md px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-3 md:py-3 text-black text-xs sm:text-sm wrap-break-word">
                                    {inspiration.photoPack}
                                </div>
                            </div>
                        )}

                        {/* Model */}
                        {inspiration.Model && (
                            <div className="flex flex-col">
                                <h3 className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                                    Model
                                </h3>
                                <div className="w-full bg-black/5 rounded-md px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-3 md:py-3 text-black text-xs sm:text-sm wrap-break-word">
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

