// export const fromTo = (offset, base = new Date()) =>  {
//     // Не использую StringValue, т.к. с ним больше мороки: нужно импортить при использовании итд.
//     const offsetMs = typeof offset === 'string' ? ms(offset as StringValue) : offset;
//     const date = new Date(base.valueOf() + offsetMs);
//     const [ from, to ] = offsetMs > 0 ? [ base, date ] : [ date, base ];
//     return { from, to };
// }

import moment from "moment";

export const fromTo = (offset) => {
    const offsetAmount = offset.match(/-\d+/)[0];
    const offsetUnit = offset.replace(offsetAmount, "");
    const [from, to] = [moment().add(offsetAmount, offsetUnit).format('YYYY-MM-DDTHH:mmZ'), moment().format('YYYY-MM-DDTHH:mmZ')];
    return {from, to}
}