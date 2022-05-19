import React from 'react';
import loading from '../../images/loading.gif';

const PageLoading = () => {
    return (
        <div className='flex justify-center'>
            <section className='lg:w-1/4'>
                <img src={loading} alt="" />
            </section>
        </div>
    );
};

export default PageLoading;