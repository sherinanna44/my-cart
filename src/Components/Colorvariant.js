const Colorhtml = (props) =>{
  const productInfo  = props.productInfo || [];
  return (
      productInfo.map((color) => {
          return ( 
            <label aria-label={color} className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                <input type="radio" name="color-choice" value={color} className="sr-only" />
                <span aria-hidden="true" className={`size-8 rounded-full border border-${color}/10 bg-${color}-500`}></span>
              </label>
           )
       }) 
     
      
  );
}
function Colorvariant (props) {
  const colorvariant  = props.productInfo;
  if( colorvariant.length > 0 ) {
    return(
        <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>

        <fieldset aria-label="Choose a color" className="mt-4">
          <div className="flex items-center gap-x-3">
              <Colorhtml  productInfo={colorvariant}/>
          </div>
        </fieldset>
      </div>
    );
  }
}
export default Colorvariant;