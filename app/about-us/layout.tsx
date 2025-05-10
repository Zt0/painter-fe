// app/about/layout.tsx
import React from 'react';

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
        </div>
    );
};

export default AboutLayout;
