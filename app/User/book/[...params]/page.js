'use client';

import { useState } from 'react';
import { createLesson } from './prismaCreateDynamic';

import { useFormState } from 'react-dom';
export default function Book({ params }) {
  const [teacher, setTeacher] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [group, setGropup] = useState('');

  // [0] - номер пары
  // [1] - день
  // [2] - название аудитории

  const initialState = {
    message: '',
  };

  const [state, formAction] = useFormState(createLesson, initialState);

  return (
    <div className="flex  items-center justify-center flex-col w-[33%] h-[30%] bg-[#F7F7F8] border">
      <form
        action={formAction}
        className="flex items-center justify-center flex-col w-[100%] h-[100%] gap-y-[20px]"
      >
        <div>
          <h1>
            Заполните форму, чтобы занять аудиторию
            <br />
            {decodeURIComponent(params.params[2])}, {params.params[3]}, Пара{' '}
            {params.params[0]}:
          </h1>
        </div>

        <label>
          <input
            type="text"
            defaultValue={teacher}
            name="teacher"
            placeholder="ФИО преподавателя:"
          />
        </label>
        <label>
          <input
            type="text"
            defaultValue={discipline}
            name="discipline"
            placeholder="Дисциплина:"
          />
        </label>

        <label>
          <select defaultValue={group} name="group">
            <option defaultValue={''} disabled selected>
              Выберите группу
            </option>
            <option defaultValue={'ИСП9-kh31'}>ИСП9-kh31</option>
            <option defaultValue={'ИСП9-kh32'}>ИСП9-kh32</option>
          </select>
        </label>

        <input hidden type="text" value={params.params[0]} name="lessonNum" />

        <input hidden type="text" value={params.params[1]} name="lessonDay" />

        <input hidden type="text" value={params.params[2]} name="audt" />

        <input hidden type="text" value={params.params[3]} name="date" />

        <input
          className="flex w-[90%] h-[15%] items-center justify-center bg-[#921CB0]  rounded-md text-stone-50"
          type="submit"
          value="Занять аудиторию"
        ></input>

        <div aria-live="polite">{state?.message}</div>
      </form>
    </div>
  );
}
