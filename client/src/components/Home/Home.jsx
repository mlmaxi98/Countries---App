import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeDiv } from './StyledHome'
import Loading from '../Loading/Loading'
import Card from './Card/Card'
import { getCountries } from '../../redux/reducer'

export const Home = () => {

    const dispatch = useDispatch();

    //store
    const countries = useSelector(state => state.countries)
    const next = useSelector(state => state.next)
    const loading = useSelector(state => state.loading)
    const pages = useSelector(state => state.pages)

    const initialForm = {
        name: null,
        region: null,
        season: null,
        difficult: null,
        duration: null,
        page: 0,
        order: 'ASC',
        size: 10,
    }

    const [form, setForm] = useState({ ...initialForm })

    const handleForm = (event) => {
        setForm({
            ...form,
            page: 0,
            [event.target.name]: event.target.value
        })
    }

    const nextPage = () => setForm(next
        ? { ...form, page: form.page + 1 }
        : { ...form, page: 0 })


    const prevPage = () => setForm(form.page !== 0
        ? { ...form, page: form.page - 1, }
        : { ...form, page: pages, })

    useEffect(() => {
        dispatch(getCountries(form))
    }, [dispatch, form])

    const regions = [
        { value: '', name: '' },
        { value: 'Africa', name: 'África' },
        { value: 'Asia', name: 'Asia' },
        { value: 'Americas', name: 'América' },
        { value: 'Europe', name: 'Europa' },
        { value: 'Oceania', name: 'Oceanía' },
        { value: 'Polar', name: 'Polar' },
    ]
    const seasons = ['', 'Verano', 'Otoño', 'Invierno', 'Primavera']

    const ordering = [
        { value: 'ASC', name: 'Ascendente' },
        { value: 'DESC', name: 'Descendente' },
    ]

    return (
        <HomeDiv>
            <>
                <div className='menu'>

                    <div className='filtros'>

                        <div className='buscador'>

                            <input
                                type='search'
                                className='search'
                                placeholder='Buscar'
                                name='name'
                                onChange={handleForm}
                                autoComplete="off"
                            />
                            <button className='buscar' onClick={handleForm}>
                                <i className="fas fa-search" />
                            </button>

                        </div>

                        <div className='filter'>
                            <div className='ContAct'>

                                <div className='continente'>
                                    <div className='filCont'>
                                        <label>Continente:</label>
                                        <select name='region' onChange={handleForm}>
                                            {
                                                regions.map(region =>
                                                    <option key={region.name}
                                                        value={region.value}
                                                        label={region.name} />
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className='order'>
                                        <label>Ordenar por: </label>
                                        <select name='order' onChange={handleForm}>
                                            {
                                                ordering.map(order =>
                                                    <option key={order.name}
                                                        value={order.value}
                                                        label={order.name} />
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className='Actividades'>

                                    <div className='temp'>
                                        <label>Temporada:</label>
                                        <select name='season' onChange={handleForm}>
                                            {
                                                seasons.map(season =>
                                                    <option
                                                        key={season}
                                                        value={season}
                                                        label={season} />
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className='actFilters'>

                                        <div className='Duracion'>
                                            <label>Duración</label>
                                            <select name='duration' onChange={handleForm}>
                                                {
                                                    Array(6).fill(0).map((n, i) =>
                                                        <option key={i}
                                                            value={i === 0 ? '' : (n + i).toString()}>
                                                            {i === 0 ? ''
                                                                : i === 5 ? '5 o +' : (n + i)}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className='Dificultad'>
                                            <label>Dificultad</label>
                                            <select name='difficult' onChange={handleForm}>
                                                {
                                                    Array(6).fill(0).map((n, i) =>
                                                        <option key={i + 6}
                                                            value={i === 0 ? '' : (n + i).toString()}>
                                                            {i === 0 ? '' : (n + i)}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='paginado' >
                                <div className='pagination-bot'>
                                    <button className='np' onClick={prevPage}>
                                        <i className="fas fa-arrow-left" />
                                    </button>
                                    <input className='count' value={form.page + 1} disabled />
                                    <button className='np' onClick={nextPage}>
                                        <i className="fas fa-arrow-right" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='cards'>
                    {
                        loading
                            ? <Loading />
                            : countries.length > 0
                                ? countries.map(country =>
                                    <Card
                                        key={country.id}
                                        country={country} />)
                                : <span>No se encontraron resultados</span>
                    }
                </div>
            </>

        </HomeDiv>
    )
}