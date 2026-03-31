import CubeInput from './CubeInput.tsx';

interface Inputs {
    resourceCounts: number[],
    countSetters: ((count: number) => void)[]
}

function CubesInputHolder({resourceCounts, countSetters}: Inputs) {
        return <form>
                <div className="row text-center">
                    <h4>Current Resources</h4>
                </div>
                <div className="row mb-2">
                    <CubeInput resource='white' setCount={countSetters[0]} currentValue={resourceCounts[0]} />
                    <CubeInput resource='green' setCount={countSetters[1]} currentValue={resourceCounts[1]} />
                    <CubeInput resource='brown' setCount={countSetters[2]} currentValue={resourceCounts[2]} />
                    <CubeInput resource='wsmall' setCount={countSetters[3]} currentValue={resourceCounts[3]} />
                </div>
                <div className="row mb-2">
                    <CubeInput resource='yellow' setCount={countSetters[4]} currentValue={resourceCounts[4]} />
                    <CubeInput resource='blue' setCount={countSetters[5]} currentValue={resourceCounts[5]} />
                    <CubeInput resource='black' setCount={countSetters[6]} currentValue={resourceCounts[6]} />
                    <CubeInput resource='wlarge' setCount={countSetters[7]} currentValue={resourceCounts[7]} />
                </div>
                <div className="row mb-2">
                    <CubeInput resource='ultratech' setCount={countSetters[8]} currentValue={resourceCounts[8]} />
                    <CubeInput resource='vp' setCount={countSetters[9]} currentValue={resourceCounts[9]} />
                    <CubeInput resource='ships' setCount={countSetters[10]} currentValue={resourceCounts[10]} />
                </div>
            </form>;
}

export default CubesInputHolder;

