import { Filter, Search } from 'react-feather';

export const SearchInput = ({ filterData }) => {
    return (
        <fieldset className='space-y-1 text-gray-100'>
            <label htmlFor='Search' className='hidden'>
                Search
            </label>
            <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                    <button
                        type='button'
                        title='search'
                        className='p-1 focus:outline-none focus:ring'
                    >
                        <Search className='w-4 h-4 text-gray-400 ' />
                    </button>
                </span>
                <input
                    type='search'
                    name='Search'
                    placeholder='Cari...'
                    className='pl-8 bg-transparent border-[#312923] border-1 input input-sm'
                    onChange={(e) => {
                        filterData(e);
                    }}
                />
            </div>
        </fieldset>
    );
};

export const FilterInput = ({ date, setDate }) => {
    return (
        <form action='/lembur' method='get'>
            <fieldset className='space-y-1 text-gray-100'>
                <label htmlFor='Search' className='hidden'>
                    Search
                </label>
                <div className='relative'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                        <button
                            type='button'
                            title='search'
                            className='p-1 focus:outline-none focus:ring'
                        >
                            <Filter className='w-4 h-4 text-gray-400' />
                        </button>
                    </span>
                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        name='date'
                        placeholder='Filter...'
                        className='pl-8 text-xs bg-transparent border-[#312923] border-1 input input-sm'
                    />
                    <input type='submit' hidden />
                </div>
            </fieldset>
        </form>
    );
};
