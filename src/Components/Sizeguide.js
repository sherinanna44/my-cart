const Sizehtml = (props) =>{
    const productInfo  = props.productInfo || [];
    return (
        productInfo.map((size) => {
            return ( 
                <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value={size.value} className="sr-only" />
                  <span>{size.value}</span>
        
                  <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
             )
         }) 
       
        
    );
}
function Sizeguide(props){
    const sizeguide = props.productInfo;
    if( sizeguide.length > 0 ) {
        return(
            <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                </div>
    
                <fieldset aria-label="Choose a size" className="mt-4">
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                 
                   <Sizehtml  productInfo={sizeguide}/>
                  </div>
                </fieldset>
              </div>
        );
    }
    
}
export default Sizeguide;