'use client'


export default function Book({ params: { id, day, classroom } }) {
  

    const handleSubmit = async (event) => {
        event.preventDefault()
    
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя преподавателя:
                    <input type="text" value={teacher}
                    onChange={
                        (e) => setTeacher(e.target.value)} />
                </label>
                <label>
                    Дисциплина:
                    <input type="text" value={discipline}
                     onChange={
                        (e) => setDiscipline(e.target.value)} />
                </label>
                <input type="submit" value="Добавить" />
            </form>
        </div>
    )
}
