import react from "react"
import Select from "./UI/Select";


const Filter = ({filter,setFilter}) =>{
    return (
        <div>
            <input 
        value={filter.query} 
        onChange={e => setFilter({...filter, query: e.target.value})} 
        placeholder="Поиск">
      </input>
      <Select value={filter.sort} onChange={selectedSort => setFilter({...filter, sort:selectedSort})} DefaultValue="Сортировка" options={[
        {value:'title',name:'По названию'},
        {value:'body',name:'По автору'},
        {value:'tag',name:'По тегам'}
      ]}>
      </Select>
        </div>

    );
};

export default Filter;