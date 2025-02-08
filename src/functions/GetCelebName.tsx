import untypedIdToNameMap from '../data/idToNameMap.json';

interface IdToNameMap {
    [key: number]: string;
}

const idToNameMap: IdToNameMap = untypedIdToNameMap

function getCelebName(idArray: number[]): string {
    // Load idToNameMap from the JSON file

    // Map each ID to its corresponding word and join them into a name
    return idArray.map(id => idToNameMap[id] || "").join(" ");
}

export default getCelebName;


