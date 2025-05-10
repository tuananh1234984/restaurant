import React, { useEffect, useState} from "react";

const Clock = () => {
    const [timeString, setTimeString] = useState('');


    useEffect(() => {
        const updateTime = () => {
            const today = new Date();
            const weekday = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
            const day = weekday[today.getDay()];
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            const yyyy = today.getFullYear();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();

            m = checkTime(m);
            s = checkTime(s);
            dd = checkTime(dd);
            mm = checkTime(mm);

            const nowTime = `${h} giờ ${m} phút ${s} giây`;
            const date = `${day}, ${dd}/${mm}/${yyyy}`;
            const result = `${date} - ${nowTime}`;

            setTimeString(result);
        };

        const checkTime = (i) => (i < 10 ? "0" + i : i);

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return <span className="date" id="clock">{timeString}</span>
};

export default Clock;