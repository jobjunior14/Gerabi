
export default function sortieCaisseRowSetter (array) {

    const saveArray = array;

    let saveTalbeRow = 0;

    if (saveArray) {

        for (let i of saveArray) {

            const rowLength = i.data.length;
            if (saveTalbeRow < rowLength ) saveTalbeRow = rowLength;
        };

        for (let i of saveArray ) {

            if (i.data.length < saveTalbeRow) {

                const emptyToPush = saveTalbeRow - i.data.length;
                for (let j = 0; j < emptyToPush; j++) {
                    i.data.push({libel: "", amount: ""});
                };
            };
        };
    };

    return saveArray;
};

export function indexSetterSortieCaisse (array) {

    return (array.map ((el, index) => {

        const data = el.data((el, index) => {return {...el, index:  index}});
        return {...el, index: index, data: data};
    }))
}