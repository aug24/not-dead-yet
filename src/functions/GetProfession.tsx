const professionLabels = new Map([
    ['1', { label: 'actor' }],
    ['2', { label: 'writer' }],
    ['3', { label: 'athlete' }],
    ['4', { label: 'painter' }],
    ['5', { label: 'musician' }],
    ['6', { label: 'director' }],
    ['7', { label: 'engineer' }],
    ['8', { label: 'astronaut' }],
    ['9', { label: 'scientist' }],
    ['A', { label: 'politician' }],
    ['B', { label: 'tv presenter' }],
    ['C', { label: 'chess player' }],
    ['D', { label: 'military leader' }],
    ['E', { label: 'circus performer' }]
]);

function getProfession(professions: String) {
    let result = ''
    for (let i = 0; i < professions.length; i++) {
        const profession = professions[i];
        const isFirst = i === 0;
        const isLast = i === professions.length - 1;
        if (isFirst)
           result = result + 'noted '
        else if (!isLast)
           result = result + ', '
        else
           result = result + ' and '
        result = result + professionLabels.get(profession)!.label
    }
    return result
}

export default getProfession;


