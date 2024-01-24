export function deleteEmptyName (array) {
    const data = [];

    for (let i of array ) {

        if (i.name !== "" ){
            i.data.amount = i.data.amount === "" ? 0 : i.data.amount;
            data.push(i);
        } 
    }
    return data;
}

export function dateSetter (array, date) {
    return array.map (el => {return {...el, data: {...el.data, createdAt: date}}});
}
