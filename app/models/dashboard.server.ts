import { getEnv } from '~/env.server';

export async function getTotalNonStaff() {
    const url = getEnv().API + '/non-staff/total';
    const totalNonStaff = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch((error) => {
        return error;
    });

    if (!totalNonStaff.ok) {
        return {
            totalNonStaff: 0,
        };
    }

    const totalNonStaffJson: void | any = await totalNonStaff?.json();
    return {
        totalNonStaff: totalNonStaffJson.total_non_staff,
    };
}
