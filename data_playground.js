import replay1_data from "./data/replay1_data.js";

export function searchName(replay_group, searchTerm) {
    let searchNameAns = replay_group
        .reduce((accumulator, value) => {
            if (value.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                let id_obj = {
                    name: value,
                    termStart: value.name.toLowerCase().indexOf(searchTerm.toLowerCase())
                }
                accumulator.push(id_obj);
            }
            return accumulator;
        }, [])
    return searchNameAns.map(c => c.name);
}
console.log(searchName(replay1_data[0].players, "Ay"));
// console.log(replay1_data[0].players)