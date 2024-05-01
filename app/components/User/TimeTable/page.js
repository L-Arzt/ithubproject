import { useEffect } from 'react';

export default function RaspData() {
    useEffect(() => {
        fetch('https://edu.donstu.ru/api/Rasp?idGroup=53686&iCal=true')
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Ошибка при получении данных:', error));
      }, []);
      
}
