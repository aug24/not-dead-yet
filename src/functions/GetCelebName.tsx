interface IdToNameMap {
    [key: number]: string;
}

let idToNameMap: IdToNameMap | null = null;
let loadPromise: Promise<IdToNameMap> | null = null;

async function loadIdToNameMap(): Promise<IdToNameMap> {
    if (idToNameMap) return idToNameMap;

    if (!loadPromise) {
        loadPromise = fetch('/data/idToNameMap.json')
            .then(res => res.json())
            .then(data => {
                idToNameMap = data;
                return data;
            });
    }

    return loadPromise;
}

// Preload on module init
loadIdToNameMap();

function getCelebName(idArray: number[]): string {
    if (!idToNameMap) return "Loading...";
    return idArray.map(id => idToNameMap![id] || "").join(" ");
}

export { loadIdToNameMap };
export default getCelebName;
