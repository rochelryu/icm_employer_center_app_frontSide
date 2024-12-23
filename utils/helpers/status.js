export const displayStatus = (status) => {
    if(status === 'Pending') {
        return ["En cours de traitement", "magenta"]
    } else if (status === 'Accepted') {
        return ["Candidature accèpté", "cyan"]
    } else {
        return ["Candidature réfusée", "red"]
    }
}