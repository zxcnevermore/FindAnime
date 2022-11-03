import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => {
    return (
        <>
            <ContentLoader
                speed={2}
                width={300}
                height={366}
                viewBox="0 0 300 366"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <rect x="473" y="152" rx="8" ry="8" width="32" height="32" />
                <rect x="0" y="0" rx="0" ry="0" width="273" height="329" />
            </ContentLoader>
        </>
    );
};

export default Skeleton;
