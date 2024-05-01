'use client'
export default function TimeTable() {

    const fetchData = () => {
        fetch('https://edu.donstu.ru/api/Rasp?idGroup=53686&i')
            .then((response) => {

                return response.json();

            })
            .then((data) => {
                console.log(data);
            });
    }


    return (

        <div>
            <button onClick={fetchData}>Получить данные</button>
        </div>

    )
}



