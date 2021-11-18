import react from "react"
import BookItem from "./BookItem";



const TagList = ({tags}) =>{

    if (!tags.length) {
        return(
        <h1 style={{textAlign:"center"}}>КНИГИ НЕ НАЙДЕНЫ</h1>
        )
    }
    return (
        <div>
            {tags.map(tag => tag.tagname)} 
        </div>

    );
};

export default TagList;