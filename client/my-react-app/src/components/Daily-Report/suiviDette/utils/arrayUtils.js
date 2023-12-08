export function deleteEmptyName (array) {
    const data = [];

    for (let i of array ) {

        if (i.name !== "" ){
            data.push(i);
        };
    };
    return data;
};
