'use client';

import React from 'react';

interface TextWithLinksProps {
    text: string;
    className?: string;
}

/**
 * Component that parses markdown-style links [text](url) and renders them as clickable links
 * All links open in new tabs with proper security attributes
 */
export default function TextWithLinks({ text, className }: TextWithLinksProps) {
    // Regex to match markdown links: [text](url)
    // Matches: [text](url) where text can contain any characters except ] and url can contain any characters except )
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    // Find all markdown links in the text
    while ((match = linkRegex.exec(text)) !== null) {
        const [fullMatch, linkText, linkUrl] = match;
        const matchIndex = match.index;

        // Add text before the link
        if (matchIndex > lastIndex) {
            parts.push(
                <React.Fragment key={key++}>
                    {text.substring(lastIndex, matchIndex)}
                </React.Fragment>
            );
        }

        // Add the clickable link
        parts.push(
            <a
                key={key++}
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
            >
                {linkText}
            </a>
        );

        lastIndex = matchIndex + fullMatch.length;
    }

    // Add remaining text after the last link
    if (lastIndex < text.length) {
        parts.push(
            <React.Fragment key={key++}>
                {text.substring(lastIndex)}
            </React.Fragment>
        );
    }

    // If no links were found, return the original text
    if (parts.length === 0) {
        return <span className={className}>{text}</span>;
    }

    return <span className={className}>{parts}</span>;
}

