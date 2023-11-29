exports.statsDetail = async (year, month,path, SuiviDette) => {

    const data = await SuiviDette.aggregate([
        {
            $match: { annee: year}
        },
        {
            $project: {
                stats: {
                    $filter: {
                        input: "$data",
                        as: "data",
                        cond: {
                            $and: [

                                {$gte: ["$$data.mois", month]},
                                {$lte: ["$$data.mois", month]}
                            ]
                        }
                    }
                }
            }
        },
        {
            $unwind:{ path: "$stats"}
        },
        {
            $unwind: {path: `$stats.data.${path}`}
        },
        {
            $unwind: {path: `$stats.data.${path}.data`}
        },
        {
            $group: {
                _id: `$stats.data.${path}.name`,
                valeurDette: {$sum: `$stats.data.${path}.data.amount`},
                valeurPayment: {$sum: `$stats.data.${path}.data.payment`}
            }
        }
    ]);

    return data;
};

exports.statsAll = async (year, month, path, SuiviDette) => {

    const data = await SuiviDette.aggregate([

        {
            $match: { annee: year}
        },

        {
            $project: {
                stats: {
                    $filter: {
                        input: "$data",
                        as: "data",
                        cond: {
                            $and: [

                                {$gte: ["$$data.mois", month]},
                                {$lte: ["$$data.mois", month]}
                            ]
                        }
                    }
                }
            }
        },
        {
            $unwind: {path: "$stats"}
        },
        {
            $unwind: {path: `$stats.data.${path}`}
        },
        {
            $unwind: {path: `$stats.data.${path}.data`}
        },
        {
            $group: {
                _id: null,
                valeur: {$sum: `$stats.data.${path}.data.amount` }
            }
        }
    ]);

    return data
};

exports.loopingData = (array, year, month, day) => {

    const dayData = {
        fournisseurs: [],
    };
    
    for (let i of array) {
        if (i.annee === year) {

            for (let j of i.data) {

                if (j.mois === month) {
                    for (let fournisseurs of j.data.fournisseurs) {

                        for (let data of fournisseurs.data) {

                            if (Number (JSON.stringify(data.createdAt).slice (9, 11)) === day) {

                                dayData.fournisseurs.push ({
                                    name: fournisseurs.name,
                                    data: data
                                });
                            };
                        };
                    };
                };
            };
        };
    };
    return dayData;
};