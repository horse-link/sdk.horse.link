"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexFromId = void 0;
const getIndexFromId = (id) => {
    const parts = id.split("_");
    return Number(parts[parts.length - 1]);
};
exports.getIndexFromId = getIndexFromId;
