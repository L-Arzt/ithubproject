'use client';
import React, { useState } from 'react';
import { MultiSelect } from '../../../components/ui/multi-select';
import { Cat, Dog, Fish, Rabbit, Turtle } from 'lucide-react';
import { createLesson } from './prismaCreateDynamic';

import { useFormState } from 'react-dom';
export default function Book({ params }) {
  const [teacher, setTeacher] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [group, setGropup] = useState('');

  const frameworksList = [
    {
      value: 'Необязательно',
      label: 'Необязательно',
      icon: Turtle,
    },
    {
      value: 'ИСП9-kh31',
      label: 'ИСП9-kh31',
      icon: Turtle,
    },
    {
      value: 'ИСП9-kh32',
      label: 'ИСП9-kh32',
      icon: Cat,
    },
    {
      value: 'vue',
      label: 'Vue',
      icon: Dog,
    },
    {
      value: 'svelte',
      label: 'Svelte',
      icon: Rabbit,
    },
    {
      value: 'ember',
      label: 'Ember',
      icon: Fish,
    },
  ];

  // [0] - номер пары
  // [1] - день
  // [2] - название аудитории

  const initialState = {
    message: '',
  };

  const [selectedFrameworks, setSelectedFrameworks] = useState([
    'Необязательно',
  ]);

  const [state, formAction] = useFormState(createLesson, initialState);

  return (
    <div className="flex mx-auto items-center justify-center flex-col w-[33%] h-[30%] bg-[#F7F7F8] rounded-[15px]">
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

        <label className="w-[90%]">
          <input
            className="w-[100%] h-[50px] rounded-[10px] pl-3"
            type="text"
            defaultValue={teacher}
            name="teacher"
            placeholder="ФИО преподавателя:"
          />
        </label>
        <label className="w-[90%]">
          <input
            className="w-[100%] h-[50px] rounded-[10px] pl-3"
            type="text"
            defaultValue={discipline}
            name="discipline"
            placeholder="Дисциплина:"
          />
        </label>

        <label>
          <div className="p-4 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Группа</h1>
            <MultiSelect
              options={frameworksList}
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks} // optional
              placeholder="Select frameworks" // optional
              animation={2} // optional
              variant="inverted" // optional
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Выбрано:</h2>
              <ul className="list-disc list-inside">
                {selectedFrameworks.map((framework) => (
                  <li key={framework}>{framework}</li>
                ))}
              </ul>
            </div>
          </div>
        </label>

        <input hidden type="text" value={params.params[0]} name="lessonNum" />

        <input hidden type="text" value={params.params[1]} name="lessonDay" />

        <input hidden type="text" value={params.params[2]} name="audt" />

        <input hidden type="text" value={params.params[3]} name="date" />

        <input hidden type="text" value={selectedFrameworks[0]} name="group" />

        <input
          className="flex w-[90%] h-[45px] items-center justify-center bg-[#921CB0]  rounded-md text-stone-50"
          type="submit"
          value="Занять аудиторию"
        ></input>

        <div aria-live="polite">{state?.message}</div>
      </form>
    </div>
  );
}
