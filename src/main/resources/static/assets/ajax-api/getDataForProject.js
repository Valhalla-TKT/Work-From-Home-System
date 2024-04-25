import { getData } from './api-function.js';

export async function getDivisionList() {
    try {
        return await getData("/api/division/divisionList");
    } catch (error) {
        return error;
    }
}
