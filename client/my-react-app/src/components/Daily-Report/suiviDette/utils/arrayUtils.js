export function deleteEmptyName (array) {
    const data = [];

    for (let i of array ) {

        if (i.name !== "" ){
            data.push(i);
        };
    };
    return data;
};

export function dateSetter (array, date) {
    return array.map (el => {return {...el, data: {...el.data, createdAt: date}}});
}
