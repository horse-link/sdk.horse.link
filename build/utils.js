"use strict";
const getIndexFromId = (id) => {
    const parts = id.split("_");
    return Number(parts[parts.length - 1]);
};
