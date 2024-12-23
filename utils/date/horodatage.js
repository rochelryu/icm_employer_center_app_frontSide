import { formatDistanceToNow, format, differenceInSeconds } from 'date-fns';
import { fr } from 'date-fns/locale';

export const horodatage = (date) => {
    const differenceTime = differenceInSeconds(new Date(), date)
    if(differenceTime <= 259200) {
        return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    } else {
        return format(date, 'dd-MM-yyyy', { locale: fr });
    }
}
