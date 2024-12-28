const formatTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '/' + dd + '/' + yyyy;

    return formattedToday;
}

export const getTodayIsoDate = () => {
    const todayISO = new Date().toISOString();
    return todayISO;
}

export default formatTodayDate