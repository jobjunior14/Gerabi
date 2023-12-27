export const indexMatcher = (array1, array2) => {

    const saveArray = [...array2]
    for (let i = 0; i < array1.length; i++) {
        const index1 = array1.findIndex(el => el.name === array1[i].name);
        const index2 = array1.findIndex(el => el.name === saveArray[i]._id);

        let save = null;
        if (!(index1 === index2)) {

            save = saveArray[index2];
            saveArray[index2] = saveArray[index1];
            saveArray[index1] = save;
        };
    };

    return saveArray;
};