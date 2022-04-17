import react from "react"
import BookItem from "./BookItem";



const TagList = ({ tags }) => {

    let buf = []
    tags?.map(tag => buf.push(tag.tagname))

    if (!tags?.length) {
        return (
            <h1 style={{ textAlign: "center" }}></h1>
        )
    }
    return (
        <div>
            {//tags.map(tag => tag.tagname+', ')
                buf.toString()
            }
        </div>

    )

};

export default TagList;