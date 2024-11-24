// components/CodeBlock.tsx
import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodeBlockProps {
    code: string;
    language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
    const [copied, setCopied] = useState(false);
    const trimmedCode = code.trim();
    useEffect(() => {
        Prism.highlightAll();
    }, [trimmedCode]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(trimmedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    return (
        <div className="code-block-wrapper">
            <button
                className="copy-button"
                onClick={copyToClipboard}
                title="Copy to clipboard"
            >
                <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            </button>
            <pre className="code-container">
                <code className={`language-${language}`}>
                    {trimmedCode}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
