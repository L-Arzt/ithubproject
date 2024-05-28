'use client';

import { useState } from 'react';
import { createLesson } from './prismaCreateDynamic';
import { useFormState } from 'react-dom';
export default function Book({ params }) {
  const [teacher, setTeacher] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [group, setGropup] = useState('');
  // function handleSubmit(e) {
  //     e.preventDefault()
  //     const formData = new FormData(e.target)
  //     console.log(Object.fromEntries(formData));
  // }
  // console.log(params.params);
  // [0] - номер пары
  // [1] - день
  // [2] - название аудитории

  const initialState = {
    message: '',
  };

  const [state, formAction] = useFormState(createLesson, initialState);

  return (
    <div>
      <form action={formAction}>
        <div>
          <h1>Выбранный день {params.params[3]}</h1>
        </div>

        <label>
          Имя преподавателя:
          <input type="text" defaultValue={teacher} name="teacher" />
        </label>
        <label>
          Дисциплина:
          <input type="text" defaultValue={discipline} name="discipline" />
        </label>

        <label>
          Группа:
          <input type="text" defaultValue={group} name="group" />
        </label>

        <input hidden type="text" value={params.params[0]} name="lessonNum" />

        <input hidden type="text" value={params.params[1]} name="lessonDay" />

        <input hidden type="text" value={params.params[2]} name="audt" />

        <input hidden type="text" value={params.params[3]} name="date" />

        <input type="submit" value="Добавить" />

        <div aria-live="polite">{state?.message}</div>
      </form>
    </div>
  );
}
