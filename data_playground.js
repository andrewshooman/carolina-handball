import replay1_data from "./data/replay1_data.js";

let enteredData;
let foundNames = [];
export function searchName(replay_group, searchTerm) {
    foundNames = [];
    let i = 0;
    let searchNameAns = replay_group
        .reduce((accumulator, value) => {
            if (value.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                let id_obj = {
                    name: value,
                    termStart: value.name.toLowerCase().indexOf(searchTerm.toLowerCase())
                }
                foundNames[i] = " " + value.name;
                i++;
                accumulator.push(id_obj);
            }
            return accumulator;
        }, [])
    return searchNameAns.map(c => c.name);
}
export const renderResults = function() {
    return `<div class="box" style="display: flex">
    <span style="display: inline-flex; flex-grow: 1; align-items: center;">
    <span class="has-text-weight-bold">Result:</span>&nbsp;${searchName(replay1_data[0].players, enteredData)}</span>
    <strong>${foundNames}</strong>
</div>`
}
document.getElementById('input').addEventListener('keyup', event => {
    const $searchresults = $('#search-results');
    $( '#search-results *' ).replaceWith();
    if (event.code === 'Enter') {
        if (event.currentTarget.value != '') {
            enteredData = event.currentTarget.value;
            $searchresults.append(renderResults);
        }
    }
})