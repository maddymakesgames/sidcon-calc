import { resourceImage } from './ResourceUtils.tsx';


function CubeInput({resource, setCount, currentValue}) {
    const image = resourceImage(resource);
    const inputID = resource + "-input";


    return <div className="col col-6 col-md-3">
               <div className="input-group">
                   <label htmlFor={inputID} className="input-group-text">
                       {image}
                   </label>
                   <input className="form-control" id={inputID} type="number" value={currentValue} min={0} onInput={(e) => setCount(parseInt(e.target.value))} />
               </div>
           </div>;
}

export default CubeInput;
