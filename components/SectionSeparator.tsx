import React from 'react';

const SectionSeparator: React.FC = () => {
    return (
        <div className="w-full bg-black flex items-center justify-center py-8 relative z-10">
            <div className="h-px w-full max-w-7xl mx-auto px-4 sm:px-6">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </div>
    );
};

export default SectionSeparator;
