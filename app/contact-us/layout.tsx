// app/contact/layout.tsx
import React from 'react';

const ContactLayout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
        </div>
    );
};

export default ContactLayout;
