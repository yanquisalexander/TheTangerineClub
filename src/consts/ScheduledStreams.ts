const getUTCTimestamp = (
    day: number,
    localHour: number,
    localOffset: number,
) => {
    // Crear una fecha en UTC en la medianoche (00:00) del día actual
    const date = new Date(
        Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate(),
        ),
    );

    // Ajustar al día de la semana deseado
    const currentUTCDay = date.getUTCDay();
    const targetDay = (day + 7 - currentUTCDay) % 7;
    date.setUTCDate(date.getUTCDate() + targetDay);

    // Convertir la hora local a UTC
    const utcHour = localHour + localOffset; // Brazil Time (GMT-3) tiene un offset de +3 horas respecto a UTC

    // Establecer la hora en UTC
    date.setUTCHours(utcHour, 0, 0, 0);
    return date.toISOString();
};

// Offset para Brazil Time (GMT-3)
const BRT_OFFSET = 3;


export const SCHEDULED_STREAMS = [
    {
        title: "Wednesday",
        time: "8:00 PM",
        utc: getUTCTimestamp(3, 20, BRT_OFFSET), // Miércoles a las 20:00 BRT
        endUtc: getUTCTimestamp(3, 23, BRT_OFFSET),
    },
    {
        title: "Thursday",
        time: "4:00 PM",
        utc: getUTCTimestamp(4, 16, BRT_OFFSET), // Jueves a las 16:00 BRT
        endUtc: getUTCTimestamp(4, 20, BRT_OFFSET), // Jueves a las 20:00 BRT
    },
    {
        title: "Friday",
        time: "4:00 PM",
        utc: getUTCTimestamp(5, 16, BRT_OFFSET), // Viernes a las 16:00 BRT
        endUtc: getUTCTimestamp(5, 20, BRT_OFFSET), // Viernes a las 20:00 BRT
    },
    {
        title: "Saturday",
        time: "4:00 PM",
        utc: getUTCTimestamp(6, 16, BRT_OFFSET), // Sábado a las 16:00 BRT
        endUtc: getUTCTimestamp(6, 20, BRT_OFFSET), // Sábado a las 20:00 BRT
    },
    {
        title: "Sunday",
        time: "4:00 PM",
        utc: getUTCTimestamp(0, 16, BRT_OFFSET), // Domingo a las 16:00 BRT
        endUtc: getUTCTimestamp(0, 20, BRT_OFFSET), // Domingo a las 20:00 BRT
    },
];