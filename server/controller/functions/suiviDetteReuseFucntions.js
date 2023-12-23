//reuse Function are Just functions used in a specific file and are not really reusable

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
