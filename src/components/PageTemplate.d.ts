import { default as React, ReactNode } from 'react';
interface PageTemplateProps {
    title: string;
    description?: string;
    children: ReactNode;
}
declare const PageTemplate: React.FC<PageTemplateProps>;
export default PageTemplate;
