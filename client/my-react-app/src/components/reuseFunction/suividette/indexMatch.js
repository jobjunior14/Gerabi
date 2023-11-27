exports.indexMatcher = (array1, array2) => {

    const saveA = [...array2]
    for (let i = 0; i < array1.length; i++) {
        const index1 = array1.findIndex(el => el.name === array1[i].name);
        const index2 = array1.findIndex(el => el.name === saveA[i]._id);

        console.log (index1, index2);
        let save = null;
        if (!(index1 === index2)) {

            save = saveA[index2];
            saveA[index2] = saveA[index1];
            saveA[index1] = save;
        };
    };

    console.log(array2, 'hey' , array1)
    return saveA;
}