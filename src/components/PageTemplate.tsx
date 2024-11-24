// PageTemplate.tsx
import React, { ReactNode } from 'react';

interface PageTemplateProps {
    title: string;
    description?: string;
    children: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, description, children }) => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>{title}</h2>
                {description && <p className="page-description">{description}</p>}
            </div>
            {children}
        </div>
    );
};

export default PageTemplate;
