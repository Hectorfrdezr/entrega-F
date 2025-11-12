interface Props {
    totalItems:number;
    page:  number;
    setPage: React.Dispatch<React.SetStateAction<number>>
};


export const Pagination = ({totalItems, page, setPage}:Props) => {
  
    const handleNextpage = () => {
        setPage (page +1);
    }

    const handlePrevPage = () => {
        setPage (prevPage => Math.max(prevPage -1, 1));
    }

    const itemsPerpage = 10;
    const totalPages = totalItems ? Math.ceil(totalItems/itemsPerpage):0;
    
    const isLastpage = page >= totalPages;
    const starItem = (page -1) * itemsPerpage +1;
    const endItem = Math.min(page * itemsPerpage, totalItems);
  
  
    return (
    <div className="flex justify-between items-center ">
        <p className="text-xs font-medium gap-2 mr-2">
            Mostrando <span className="bold">
                {starItem}-{endItem}
            </span>{' '} de <span className="font-bold">{totalItems} </span>productos
        </p>

        <div className="flex gap-3">
            <button className= 'border border-slate-700 rouded-md font-semibold text-xs py-1 px-2 hover:bg-slate-700 hover:text-white transition-all disabled::opacity-50 disabled:cursor-not-allowed disabled:border-slate-800 disabled:hover:bg-white disabled:hover:text-slate-700'
            onClick={handlePrevPage}
            disabled = {page === 1}>
                anterior
            </button>

            <button
            className="border border-slate-700 rouded-md font-semibold text-xs py-1 px-3 hover:bg-slate-700 hover:text-white transition-all disabled::opacity-50 disabled:cursor-not-allowed disabled:border-slate-800 disabled:hover:bg-white disabled:hover:text-slate-700"
            onClick={handleNextpage}
            disabled = {isLastpage}>
                siguiente
            </button>
        </div>
    </div>
  )
}
